import React, { useState, useRef } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    stock: "",
  });
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.price <= 0) newErrors.price = "Price must be positive";
    if (form.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!form.image && !editId) newErrors.image = "Image is required";

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
      await API.post("/products", formData);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: "",
      });
      setPreviewImage(null);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };
  return (
    <div>
      {/* Add/Edit Product Form */}
      <form onSubmit={addProduct} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleFormChange}
            placeholder="Category"
            required
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleFormChange}
            placeholder="Price"
            required
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleFormChange}
            placeholder="Stock Quantity"
            required
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFormChange}
            ref={fileInputRef}
            className="hidden"
          />
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Choose Image
            </button>
            <span className="text-gray-600">
              {form.image ? form.image.name : "No file chosen"}
            </span>
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            </div>
          )}

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
          onClick={addProduct}
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
