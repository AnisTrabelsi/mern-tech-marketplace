import axios from 'axios';

const api = axios.create({
  // baseURL doit être juste l’hôte + port, sans path incomplet
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  console.log('→ REQ:', cfg.method.toUpperCase(), cfg.baseURL + cfg.url, 'jwt=', !!token);
  return cfg;
}, e => Promise.reject(e));

export default api;
