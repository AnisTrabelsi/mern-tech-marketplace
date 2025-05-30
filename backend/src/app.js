import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';

import authRoutes    from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes    from './routes/cart.js';
import orderRoutes   from './routes/order.js';
import stripeRoutes  from './routes/stripe.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => console.error('✖ MongoDB error:', err));

const app = express();

// Permet les requêtes arrivant de http://localhost:3000
app.use(cors());

// Sert le dossier `uploads/` pour accéder aux images
app.use('/uploads', express.static('uploads'));

// Parse le JSON pour les routes sans fichier
app.use(express.json());

// Routes
app.use('/api/auth',    authRoutes);
// Multer (multipart/form-data) est géré dans productRoutes via upload middleware
app.use('/api/products', productRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/stripe',   stripeRoutes);

export default app;
