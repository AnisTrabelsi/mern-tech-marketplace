// Import du framework Express pour créer l’API
import express from 'express';

// Import de CORS pour autoriser les requêtes cross-origin (entre domaines)
import cors from 'cors';

// Import de dotenv pour charger les variables d’environnement depuis un fichier .env
import dotenv from 'dotenv';

// Import de Mongoose pour interagir avec MongoDB
import mongoose from 'mongoose';

// Import des routes d’authentification
import authRoutes from './routes/auth.js';

// Chargement des variables d’environnement (MONGO_URI, JWT_SECRET, etc.)
dotenv.config();

// Connexion à MongoDB via Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,    // utilise le nouvel analyseur d’URL
    useUnifiedTopology: true, // utilise le nouveau moteur de monitoring
  })
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => console.error('✖ MongoDB connection error:', err));

// Création de l’application Express
const app = express();

// Activation du middleware CORS pour toutes les routes
app.use(cors());

// Activation du parsing automatique du JSON dans le corps des requêtes
app.use(express.json());

// Définition d’un endpoint GET /api/status qui retourne un simple objet JSON { status: 'OK' }
app.get('/api/status', (req, res) => res.json({ status: 'OK' }));

// Montée des routes d’authentification sous /api/auth
app.use('/api/auth', authRoutes);

// Export de l’application pour l’utiliser dans index.js (point d’entrée)
export default app;
