// backend/src/routes/order.js
import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createOrder,
  getOrder,
  listOrders
} from '../controllers/orderController.js';

const router = Router();

// Toutes les routes ci-dessous nécessitent un token valide
router.use(authenticate);

// GET  /api/orders         → historique
router.get('/', listOrders);

// GET  /api/orders/:id     → détail d’une commande
router.get('/:id', getOrder);

// POST /api/orders         → création de commande
router.post('/', createOrder);

export default router;
