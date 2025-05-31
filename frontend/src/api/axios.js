// src/api/axios.js
import axios from 'axios';

/**
 * baseURL = hôte + port [+ '/api' si vous l’avez mis dans la variable]
 * On enlève seulement les « / » de fin, on NE touche pas à « /api ».
 *
 * Exemple :
 *   REACT_APP_API_URL = http://localhost:5000/api
 *   → API_HOST = http://localhost:5000/api
 */
const API_HOST = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api')
  .replace(/\/+$/, '');   // retire les / finaux

const api = axios.create({ baseURL: API_HOST });

/* Intercepteur : ajoute le Bearer si présent et trace l’URL finale */
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;

  const full =
    `${cfg.baseURL}${cfg.url.startsWith('/') ? '' : '/'}${cfg.url}`;

  console.log('→',
    (cfg.method || 'GET').toUpperCase(),
    full,
    '| jwt =', !!token
  );
  return cfg;
});

export default api;
