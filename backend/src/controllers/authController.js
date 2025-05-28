import bcrypt from 'bcrypt';
import jwt    from 'jsonwebtoken';
import User   from '../models/User.js';

const SALT_ROUNDS = 10;

/**
 * Route POST /api/auth/register
 * Crée un nouvel utilisateur et renvoie un token JWT.
 */
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Hashage du mot de passe
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({ email, password: hash });

    // Lecture dynamique de la clé secrète
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET non défini');
    }

    // Génération du token JWT valable 1 jour
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1d' });

    return res.status(201).json({ token });
  } catch (err) {
    // Gestion des doublons (email unique)
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    // Gestion des erreurs de validation Mongoose
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Route POST /api/auth/login
 * Vérifie les identifiants et renvoie un token JWT si valides.
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Lecture dynamique de la clé secrète
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET non défini');
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Route GET /api/auth/me
 * Récupère le profil de l’utilisateur authentifié.
 */
export async function me(req, res) {
  // Le middleware authenticate a déjà attaché req.user (sans le mot de passe)
  return res.json(req.user);
}
