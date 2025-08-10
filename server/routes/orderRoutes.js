import express from 'express';
import { admin, protect } from '../middleware/auth.js';

const orderRoutes = express.Router();

// orderRoutes.post('/',protect,placeOrder);
// orderRoutes.get('/myorders', protect, getMyOrders);
// orderRoutes.get('/:id', protect, getOrderById);
// orderRoutes.put('/:id', admin, updateOrderStatus);
// orderRoutes.get('/', admin, getAllOrders);


export default orderRoutes;