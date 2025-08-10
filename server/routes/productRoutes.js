import express from 'express';
import { admin } from '../middleware/auth.js';

const productRoutes = express.Router();

// productRoutes.get('/',getAllProducts);
// productRoutes.get('/:id', getProductById);
// productRoutes.post('/', admin, createProduct);
// productRoutes.put('/:id', admin, updateProduct);
// productRoutes.delete('/:id', admin, deleteProduct);

export default productRoutes;