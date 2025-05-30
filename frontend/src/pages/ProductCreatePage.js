// src/pages/ProductCreatePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) {
        data.append('image', image);
      }
      // Laisser Axios définir automatiquement le Content-Type (avec boundary)
      await api.post('/products', data);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Ajouter un produit
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Champ image */}
        <div>
          <label className="block text-gray-700 mb-1">
            Image du produit
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>

        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
        />
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
        <input
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 transition"
        >
          Créer
        </button>
      </motion.form>
    </div>
  );
}
