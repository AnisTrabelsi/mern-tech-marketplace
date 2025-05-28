import jwt from 'jsonwebtoken';          // Bibliothèque pour créer et vérifier les JSON Web Tokens
import User from '../models/User.js';    // Modèle Mongoose de l’utilisateur

// Récupère la clé secrète utilisée pour signer et vérifier les tokens depuis les variables d’environnement
const { JWT_SECRET } = process.env;

/**
 * Middleware d’authentification
 * Vérifie la présence et la validité d’un JWT dans l’en-tête Authorization.
 */
export async function authenticate(req, res, next) {
  // Récupère l’en-tête Authorization (ex. "Bearer <token>")
  const authHeader = req.headers.authorization;

  // Si l’en-tête est manquant ou n’utilise pas le schéma "Bearer", rejette la requête
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  // Extrait le token (tout ce qui suit "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token avec la clé secrète
    const payload = jwt.verify(token, JWT_SECRET);

    // Récupère l’utilisateur en base en excluant le champ password, et l’attache à la requête
    req.user = await User.findById(payload.id).select('-password');

    // Passe au middleware ou à la route suivante
    next();
  } catch {
    // Si la vérification échoue (token expiré ou invalide), renvoie 403 Forbidden
    res.status(403).json({ error: 'Token invalide' });
  }
}
