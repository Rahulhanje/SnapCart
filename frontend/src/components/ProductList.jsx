import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../../api";

function ProductList() {
  const { user } = useContext(AuthContext);
  const { searchTerm, category } = useOutletContext(); // from Layout
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter by search
  const filteredProducts = products.filter((p) =>
    searchTerm ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  // Group products by category
  const categories = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleRemove = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to remove product. Please try again later.");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {loading ? (
        <div className="text-center mt-4">Loading products...</div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center my-4">Our Products</h2>

          {/* If no products */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <>
              {Object.keys(categories)
                .filter((cat) => (category ? cat === category : true)) // show all or selected
                .map((cat) => (
                  <div key={cat} className="mb-10 max-w-7xl mx-auto px-4">
                    {/* Category Title */}
                    <h3 className="text-xl font-semibold mb-4 capitalize">
                      {cat}
                    </h3>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categories[cat].map((product) => (
                        <div
                          key={product._id}
                          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="p-3 h-40 object-contain"
                          />
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-sm font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              ${product.price}
                            </p>

                            <div className="mt-auto flex gap-2">
                              <Link
                                to={`/product/${product._id}`}
                                className="flex-1 bg-blue-500 text-white text-center mt-1 px-4 py-2 rounded hover:bg-blue-600"
                              >
                                View Details
                              </Link>
                              {user.isAdmin && (
                                <button
                                  onClick={() => handleRemove(product._id)}
                                  className="flex-1 bg-red-500 text-white px-4 py-2 mt-1 rounded hover:bg-red-600"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
