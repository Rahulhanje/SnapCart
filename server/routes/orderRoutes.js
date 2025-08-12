import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orderControllers.js';

const orderRoutes = express.Router();

orderRoutes.post('/',protect,addOrderItems);
orderRoutes.put('/status', protect, admin, updateOrderStatus);
orderRoutes.get('/myorders', protect, getMyOrders);
orderRoutes.get('/:id', protect, getOrderById);
orderRoutes.get('/',protect, admin, getAllOrders);


export default orderRoutes;