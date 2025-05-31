// backend/src/routes/ai.js
import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { generateDescription, recommendProducts, chatAssistant } from '../controllers/aiController.js';

const router = Router();

// Générer la description (nécessite authentification)
router.post('/descriptions', authenticate, generateDescription);

// Suggestions de produits similaires (un GET public)
router.get('/recommend/:productId', recommendProducts);
router.post('/assistant',      /* public ou authenticate */ chatAssistant);

export default router;
