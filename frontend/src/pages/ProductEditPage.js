// frontend/src/pages/ProductEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import AIDescriptionButton from '../components/AIDescriptionButton';

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  // Charger les données du produit à modifier
  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description || '',
          price: p.price,
          stock: p.stock,
          category: p.category || ''
        });
      })
      .catch(() => setError('Erreur chargement produit'));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append('image', imageFile);

      await api.put(`/products/${id}`, data);
      navigate(`/product/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour');
    }
  };

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  // Tant que le product n’est pas chargé, on affiche "Chargement…"
  if (!form.name) return <p className="text-center mt-6">Chargement…</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-4"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Modifier le produit
        </h2>

        {/* Upload d’une nouvelle image (optionnel) */}
        <div>
          <label className="block text-gray-700 mb-1">Nouvelle image (optionnel)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>

        {/* Nom du produit */}
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
          required
        />

        {/* Description + bouton IA */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <AIDescriptionButton
              title={form.name}
              setDesc={(desc) =>
                setForm((prev) => ({ ...prev, description: desc }))
              }
            />
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Prix et stock */}
        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            placeholder="Prix (€)"
            value={form.price}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Catégorie */}
        <input
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
        />

        {/* Bouton “Valider les modifications” */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition"
        >
          Valider les modifications
        </button>
      </motion.form>
    </div>
  );
}
