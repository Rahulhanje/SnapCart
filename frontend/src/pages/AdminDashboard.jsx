// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  PlusCircle,
  Edit,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [orderStatusData, setOrderStatusData] = useState([
    { name: "Pending", value: 10 },
    { name: "Shipped", value: 15 },
    { name: "Delivered", value: 20 },
  ]);

  const COLORS = ["#ef4444", "#3b82f6", "#22c55e"]; // red, blue, green

  const [revenue, setRevenue] = useState(1000);
  const [totalOrders, setTotalOrders] = useState(350);
  const [totalProducts, setTotalProducts] = useState(120);
  const [totalUsers, setTotalUsers] = useState(80);

  // Dummy recent orders
  const [recentOrders, setRecentOrders] = useState([
    { id: "ORD001", customer: "Alice", total: 120, status: "Pending" },
    { id: "ORD002", customer: "Bob", total: 250, status: "Shipped" },
    { id: "ORD003", customer: "Charlie", total: 90, status: "Delivered" },
    { id: "ORD004", customer: "David", total: 300, status: "Pending" },
  ]);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 m-3 text-left">Welcome Admin!</h1>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-6">
        {loading ? (
          // Skeleton loaders
          Array(4)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="w-60 h-24 bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))
        ) : (
          <>
            {/* Products */}
            <Link to="/admin/products">
              <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer">
                <Package className="text-blue-500" size={32} />
                <div>
                  <p className="text-gray-500">Products</p>
                  <h2 className="text-2xl font-bold">{totalProducts}</h2>
                </div>
              </div>
            </Link>

            {/* Orders */}
            <Link to="/admin/orders">
              <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer">
                <ShoppingBag className="text-green-500" size={32} />
                <div>
                  <p className="text-gray-500">Orders</p>
                  <h2 className="text-2xl font-bold">{totalOrders}</h2>
                </div>
              </div>
            </Link>

            {/* Users */}
            <Link to="/admin/users">
              <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer">
                <Users className="text-purple-500" size={32} />
                <div>
                  <p className="text-gray-500">Users</p>
                  <h2 className="text-2xl font-bold">{totalUsers}</h2>
                </div>
              </div>
            </Link>

            {/* Revenue */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer">
              <DollarSign className="text-yellow-500" size={32} />
              <div>
                <p className="text-gray-500">Revenue</p>
                <h2 className="text-2xl font-bold">${revenue}</h2>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Charts + Quick Actions + Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          {loading ? (
            <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl"></div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Right Column: Quick Actions + Recent Orders */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-start">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-4">
              <Link
                to="/admin/addProduct"
                className="flex md:w-1/2 items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <PlusCircle size={20} /> Add Product
              </Link>
              <Link
                to="/admin/orders/"
                className="flex items-center md:w-1/2 gap-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Edit size={20} /> Update Order Status
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            {loading ? (
              <div className="space-y-3">
                {Array(4)
                  .fill("")
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-12 bg-gray-200 animate-pulse rounded-md"
                    ></div>
                  ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                  <thead className="bg-gray-100 text-gray-600 uppercase">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="px-4 py-2 font-medium">{order.id}</td>
                        <td className="px-4 py-2">{order.customer}</td>
                        <td className="px-4 py-2">${order.total}</td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            order.status === "Pending"
                              ? "text-yellow-600"
                              : order.status === "Shipped"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
