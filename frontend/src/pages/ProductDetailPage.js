import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../contexts/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [prod, setProd]      = useState(null);
  const [error, setError]    = useState(null);
  const { updateCart }       = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProd(res.data))
      .catch(err => setError('Erreur chargement produit'));
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!prod)  return <p>Chargement…</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <img src={prod.imageUrl || '/placeholder.png'} alt={prod.name}
           className="w-full max-h-96 object-cover mb-4 rounded-lg shadow" />
      <h1 className="text-3xl font-bold">{prod.name}</h1>
      <p className="text-xl text-green-600">{prod.price.toFixed(2)} €</p>
      <p>{prod.description}</p>

      {/* Bouton Ajouter au panier */}
      <button
        onClick={() => updateCart(prod._id, 1)}
        className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Ajouter au panier
      </button>

      <Link to="/products" className="inline-block mt-4 text-purple-600 hover:underline">
        ← Retour à la liste
      </Link>
    </div>
  );
}
