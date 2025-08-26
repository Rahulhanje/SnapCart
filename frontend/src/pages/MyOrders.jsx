import React, { useEffect, useState } from "react";
import API from "../../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myOrders"); // 👈 user-specific API
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center py-8">Loading your orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (orders.length === 0)
    return <p className="text-center py-8">You have no orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-lg font-semibold">Order #{order._id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b pb-3 last:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="mt-4 flex flex-col md:flex-row justify-between text-sm text-gray-600">
              <p>
                <strong>Total: </strong>₹{order.totalPrice}
              </p>
              <p>
                <strong>Ordered on: </strong>
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
