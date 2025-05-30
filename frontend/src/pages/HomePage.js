// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <motion.div
      className="container mx-auto p-6 flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-800">Bienvenue sur la Marketplace MERN</h2>
      <p className="text-gray-600">Parcourez nos produits et connectez-vous pour en profiter pleinement.</p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition"
        >
          Se connecter
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-600 transform hover:-translate-y-1 transition"
        >
          S’inscrire
        </Link>
      </div>
      <div className="mt-8 flex gap-4">
        <Link to="/products" className="text-blue-600 hover:underline">
          Voir le catalogue
        </Link>
        <Link to="/admin/products/new" className="text-purple-600 hover:underline">
          Ajouter un produit
        </Link>
      </div>
    </motion.div>
  );
}
