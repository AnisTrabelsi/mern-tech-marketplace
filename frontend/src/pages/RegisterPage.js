// src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { email, password: pass });
      setError(null);
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-2xl hover:bg-green-600 transition transform hover:scale-105"
        >
          S’inscrire
        </button>
        <p className="text-center text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </motion.form>
    </div>
  );
}