import React, { useEffect, useState, useContext } from 'react';
import { Link }             from 'react-router-dom';
import { motion }           from 'framer-motion';
import api                  from '../api/axios';
import { CartContext }      from '../contexts/CartContext';
import { toast }            from 'react-toastify';
import ChatAssistant        from '../components/ChatAssistant';

/**
 * Convention retenue
 * ───────────────────
 *   baseURL  = http://localhost:5000        (PAS de « /api »)
 *   Appels   = '/api/...'                   (exactement UNE fois « /api »)
 */
export default function ProductListPage() {
  const { updateCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [error,    setError]    = useState(null);

  /* URL absolue pour les images (on retire un éventuel /api) */
  const host =
    (process.env.REACT_APP_API_URL || api.defaults.baseURL || 'http://localhost:5000')
      .replace(/\/api$/, '')      // supprime le segment /api s’il existe
      .replace(/\/+$/, '');       // supprime les / finaux

  /* ─────────── Chargement des produits ─────────── */
  useEffect(() => {
    const ctrl = new AbortController();

    api.get('/products', {
      params: { search, category },
      signal: ctrl.signal
    })
      .then((res) => {
        setProducts(res.data.products);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') {
          console.error(err);
          setError('Erreur chargement produits');
        }
      });

    return () => ctrl.abort();
  }, [search, category]);

  /* ─────────── Suppression (admin) ─────────── */
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Produit supprimé');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  /* ─────────── Ajout au panier ─────────── */
  const handleAdd = async (productId) => {
    try {
      await updateCart(productId, 1);
      toast.success('Produit ajouté au panier');
    } catch {
      toast.error('Impossible d’ajouter au panier');
    }
  };

  /* ─────────────────── Render ─────────────────── */
  return (
    <>
      <div className="container mx-auto p-6">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Recherche + filtre + ajout (admin) */}
        <div className="flex gap-4 mb-6">
          <input
            className="border rounded p-2 flex-1"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Toutes catégories</option>
            <option value="PC">PC</option>
            <option value="Accessoires">Accessoires</option>
          </select>

          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            + Ajouter
          </Link>
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const img = p.imageUrl ? `${host}${p.imageUrl}` : '/placeholder.png';
            return (
              <motion.div
                key={p._id}
                className="border rounded-lg p-4 flex flex-col"
                whileHover={{ scale: 1.03, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
              >
                <Link to={`/product/${p._id}`} className="flex-1">
                  <img
                    src={img}
                    alt={p.name}
                    className="h-32 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-green-600">{p.price.toFixed(2)} €</p>
                </Link>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAdd(p._id)}
                    title="Ajouter au panier"
                    className="flex-1 text-center px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    🛒
                  </button>

                  <Link
                    to={`/admin/products/${p._id}/edit`}
                    className="flex-1 text-center px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 text-center px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bulle de chat IA */}
      <ChatAssistant />
    </>
  );
}
