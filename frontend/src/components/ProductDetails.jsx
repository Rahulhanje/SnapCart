import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return loading ? (
    <p className="text-center py-6">Loading product...</p>
  ) : error ? (
    <p className="text-center py-6 text-red-500">{error}</p>
  ) : !product ? (
    <p className="text-center py-6">Product not found</p>
  ) : (
    <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">${product.price}</p>

        <div className="flex gap-4">
          {/* Add to Cart */}
          <button
            onClick={() =>
              API.post("/cart", { productId: product._id, quantity: 1 })
            }
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>

          {/* Go to Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
