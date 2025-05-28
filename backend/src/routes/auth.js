import { Router } from 'express';                       // Import du routeur d’Express pour définir des routes modularisées
import { register, login, me } from '../controllers/authController.js';
import { authenticate }       from '../middleware/auth.js';

const router = Router();                                // Création d’une instance de Router

// Route POST /api/auth/register → appelle la fonction register pour créer un nouvel utilisateur
router.post('/register', register);

// Route POST /api/auth/login → appelle la fonction login pour authentifier un utilisateur existant
router.post('/login', login);

// Route protégée, exige un Bearer token valide
router.get('/me', authenticate, me);

export default router;                                  // Export du routeur pour l’utiliser dans src/app.js
