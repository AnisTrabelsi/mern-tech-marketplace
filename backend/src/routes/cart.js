import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCart, updateCart, removeFromCart, clearCart } from '../controllers/cartController.js';

const router = Router();

// toutes les routes suivantes requièrent un JWT valide
router.use(authenticate);

router.get('/',    getCart);
router.post('/',   updateCart);
router.delete('/', clearCart);
router.delete('/:productId', removeFromCart);

export default router;
