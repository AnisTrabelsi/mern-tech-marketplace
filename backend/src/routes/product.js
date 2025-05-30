import { Router } from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { upload }       from '../middleware/upload.js';

const router = Router();

// Public : liste & détail
router.get('/',    listProducts);
router.get('/:id', getProduct);

// Protégé : création, update, suppression
// upload.single('image') doit précéder le controller
router.post(
  '/',
  authenticate,
  upload.single('image'),
  createProduct
);

router.put(
  '/:id',
  authenticate,
  upload.single('image'),
  updateProduct
);

router.delete(
  '/:id',
  authenticate,
  deleteProduct
);

export default router;
