import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productControllers.js';

const productRoutes = express.Router();

productRoutes.get('/',getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', protect, admin, createProduct);
productRoutes.put('/:id',protect, admin, updateProduct);
productRoutes.delete('/:id',protect, admin, deleteProduct);

export default productRoutes;