// backend/src/middleware/auth.js
import dotenv from 'dotenv';
dotenv.config();                           // <<--- ajouté
import jwt from 'jsonwebtoken';
import User from '../models/User.js';



export async function authenticate(req, res, next) {
  const hdr = req.headers.authorization || '';

  // Étape 1 : presence du préfixe “Bearer ”
  if (!hdr.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  // Extrait le token (tout ce qui suit “Bearer ”)
  const token = hdr.slice(7);

  try {
    // Étape 2 : vérifier le token JWT (lève si invalide/expiré)
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.id;

    // Étape 3 : récupérer l’utilisateur en DB
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur inconnu' });
    }

    // Étape 4 : attacher l’objet user sur la requête, pour l’utiliser dans le contrôleur
    req.user = user;
    return next();
  } catch (err) {
    // Différencier l’erreur JWT d’une erreur DB ou autre
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      console.error('Auth middleware – JWT invalide ou expiré:', err);
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    // Si c’est une autre erreur (ex. problème BD), renvoie 500
    console.error('Auth middleware – Erreur interne:', err);
    return res.status(500).json({ error: 'Erreur interne Auth' });
  }
}
