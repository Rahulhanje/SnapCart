// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../../api";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/products");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again later.");
//         console.error("Error fetching products: ", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);
//   return (
//     <div>
//       {/* Error Message */}
//       {error && <div className="text-red-500 text-center mt-4">{error}</div>}

//       {/* Loading State */}
//       {loading ? (
//         <div className="text-center mt-4">Loading products...</div>
//       ) : (
//         <div>
//           {/* Section Title */}
//           <h2 className="text-2xl font-bold text-center my-4">Our Products</h2>

//           {/* Product List */}
//           <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <p className="text-gray-600">${product.price}</p>
//                   <Link
//                     to={`/product/${product._id}`} // Adjust the path as needed
//                     className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;
import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProductList() {
  const { user } = useContext(AuthContext);
  const { searchTerm, category } = useOutletContext(); // from Layout
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Dummy product data (replace with API call)
    const fetchProducts = () => {
      try {
        const dummyProducts = [
          {
            _id: "1",
            name: "Wireless Headphones",
            price: 59.99,
            image: "./vite.svg",
            category: "electronics",
          },
          {
            _id: "2",
            name: "Smart Watch",
            price: 129.99,
            image: "https://via.placeholder.com/300x200?text=Smart+Watch",
            category: "electronics",
          },
          {
            _id: "3",
            name: "Gaming Mouse",
            price: 29.99,
            image: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
            category: "electronics",
          },
          {
            _id: "4",
            name: "Mechanical Keyboard",
            price: 89.99,
            image: "https://via.placeholder.com/300x200?text=Keyboard",
            category: "accessories",
          },
          {
            _id: "5",
            name: "T-Shirt",
            price: 19.99,
            image: "https://via.placeholder.com/300x200?text=T-Shirt",
            category: "clothing",
          },
          {
            _id: "6",
            name: "Jeans",
            price: 39.99,
            image: "https://via.placeholder.com/300x200?text=Jeans",
            category: "clothing",
          },
        ];
        setProducts(dummyProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchProducts, 500);
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

  const handleRemove = (id) => {
    setProducts(products.filter((p) => p._id !== id));
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