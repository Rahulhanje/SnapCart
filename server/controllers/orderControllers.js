


export const addOrderItems= async (req, res) => {
    console.log("Adding order items");
    console.log(req.body);
    console.log(req.user);
    res.status(201).json({ message: "Order items added successfully" });
}


export const getMyOrders = async (req, res) => {

}


export const getOrderById = async (req, res) => {

}

export const getAllOrders = async (req, res) => {

}

export const updateOrderStatus = async (req, res) => {

}