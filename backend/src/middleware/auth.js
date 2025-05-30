// backend/src/middleware/auth.js
import dotenv from 'dotenv';
dotenv.config();                           // <<--- ajouté
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function authenticate(req, res, next) {
  const hdr = req.headers.authorization || '';
  if (!hdr.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    const { id } = jwt.verify(hdr.slice(7), process.env.JWT_SECRET);
    User.findById(id).select('-password').then(u => {
      if (!u) return res.status(401).json({ error: 'Utilisateur inconnu' });
      req.user = u;
      next();
    });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(403).json({ error: 'Token invalide' });
  }
}
