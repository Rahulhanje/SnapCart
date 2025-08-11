import Order from "../models/orderModel.js";

export const addOrderItems = async (req, res) => {
    try {
        const { products, shippingAddress, totalPrice } = req.body;

        // Validate required fields
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No order items provided' });
        }
        if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            return res.status(400).json({ message: 'Shipping address is incomplete' });
        }
        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ message: 'Invalid total price' });
        }

        // Create new order
        const order = new Order({
            userId: req.user._id, // assuming you're using auth middleware to set req.user
            products,
            shippingAddress,
            totalPrice,
            status: 'Pending',
            orderDate: new Date(),
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        // Validate status
        if (!['Pending', 'Shipped', 'Delivered'].includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        // Find and update the order
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
