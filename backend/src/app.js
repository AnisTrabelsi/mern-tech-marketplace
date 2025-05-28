// Import du framework Express pour créer l’API
import express from 'express';

// Import de CORS pour autoriser les requêtes cross-origin (entre domaines)
import cors from 'cors';

// Import de dotenv pour charger les variables d’environnement depuis un fichier .env
import dotenv from 'dotenv';

// Chargement des variables d’environnement (MONGO_URI, JWT_SECRET, etc.)
dotenv.config();

// Création de l’application Express
const app = express();

// Activation du middleware CORS pour toutes les routes
app.use(cors());

// Activation du parsing automatique du JSON dans le corps des requêtes
app.use(express.json());

// Définition d’un endpoint GET /api/status qui retourne un simple objet JSON { status: 'OK' }
app.get('/api/status', (req, res) => res.json({ status: 'OK' }));

// Export de l’application pour l’utiliser dans index.js (point d’entrée)
export default app;
