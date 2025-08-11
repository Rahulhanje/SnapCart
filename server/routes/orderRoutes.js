import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orderControllers.js';

const orderRoutes = express.Router();

orderRoutes.post('/',protect,addOrderItems);
orderRoutes.get('/myorders', protect, getMyOrders);
orderRoutes.get('/:id', protect, getOrderById);
orderRoutes.put('/:id/status', protect, admin, updateOrderStatus);
orderRoutes.get('/',protect, admin, getAllOrders);


export default orderRoutes;