import React, { useEffect, useState, useRef } from "react";
import API from "../../api";
import { set } from "mongoose";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null, // For image upload
    stock: "",
  });
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null); // For editing a product
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch products and orders
  const fetchData = async () => {
    try {
      const prodRes = await API.get("/products");
      const orderRes = await API.get("/orders");
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: files[0] });

      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setPreviewImage(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (form.price <= 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (form.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!form.image && !editId) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError(null);

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (editId) {
        await API.put(`/products/${editId}`, formData);
      } else {
        await API.post("/products", formData);
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: "",
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null, // Reset image for edit
      stock: product.stock,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchData();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded ${
            tab === "products" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded ${
            tab === "orders" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Orders
        </button>
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <div>
          {/* Add/Edit Product Form */}
          <form
            onSubmit={handleAddOrUpdateProduct}
            className="bg-white shadow rounded p-4 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Product Name"
                required
                className="border p-2 rounded"
              />

              {/* Category */}
              <input
                name="category"
                value={form.category}
                onChange={handleFormChange}
                placeholder="Category"
                required
                className="border p-2 rounded"
              />

              {/* Price */}
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleFormChange}
                placeholder="Price"
                required
                className="border p-2 rounded"
              />

              {/* Stock Quantity */}
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleFormChange}
                placeholder="Stock Quantity"
                required
                className="border p-2 rounded"
              />

              {/* image file */}
              {/* Hidden File Input */}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFormChange}
                ref={fileInputRef}
                className="hidden"
              />

              {/* Button to trigger file input */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Choose Image
                </button>

                {/* File Name Display */}
                <span className="text-gray-600">
                  {form.image ? form.image.name : "No file chosen"}
                </span>
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg shadow"
                  />
                </div>
              )}

              {/* Description */}
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Description"
                required
                className="border p-2 rounded md:col-span-2"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* Product List */}
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Stock</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="py-2 px-4">{p.name}</td>
                    <td className="py-2 px-4">${p.price}</td>
                    <td className="py-2 px-4">{p.stock}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Total Price</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b">
                    <td className="py-2 px-4">{o._id}</td>
                    <td className="py-2 px-4">{o.userId}</td>
                    <td className="py-2 px-4">${o.totalPrice}</td>
                    <td className="py-2 px-4">
                      <select
                        value={o.status}
                        onChange={(e) =>
                          updateOrderStatus(o._id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
