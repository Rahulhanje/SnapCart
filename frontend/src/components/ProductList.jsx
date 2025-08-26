import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching from backend with dummy data
    const fetchProducts = () => {
      try {
        // Dummy product data with better images
        const dummyProducts = [
          {
            _id: "1",
            name: "Wireless Headphones",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
            category: "Audio",
            rating: 4.5,
            badge: "Best Seller"
          },
          {
            _id: "2",
            name: "Smart Watch",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
            category: "Wearable",
            rating: 4.8,
            badge: "New"
          },
          {
            _id: "3",
            name: "Gaming Mouse",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center",
            category: "Gaming",
            rating: 4.3,
            badge: "Sale"
          },
          {
            _id: "4",
            name: "Mechanical Keyboard",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center",
            category: "Gaming",
            rating: 4.6,
            badge: "Premium"
          },
          {
            _id: "5",
            name: "Bluetooth Speaker",
            price: 45.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center",
            category: "Audio",
            rating: 4.4,
            badge: "Trending"
          },
          {
            _id: "6",
            name: "Laptop Stand",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1527334919515-b8dee906a34b?w=400&h=300&fit=crop&crop=center",
            category: "Accessories",
            rating: 4.2,
            badge: "Eco-Friendly"
          }
        ];

        setProducts(dummyProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products: ", err);
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay
    setTimeout(fetchProducts, 1000);
  }, []);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Best Seller": return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "New": return "bg-gradient-to-r from-green-400 to-blue-500";
      case "Sale": return "bg-gradient-to-r from-red-400 to-pink-500";
      case "Premium": return "bg-gradient-to-r from-purple-400 to-indigo-600";
      case "Trending": return "bg-gradient-to-r from-cyan-400 to-teal-500";
      case "Eco-Friendly": return "bg-gradient-to-r from-emerald-400 to-green-600";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Audio": return "text-purple-600 bg-purple-100";
      case "Wearable": return "text-blue-600 bg-blue-100";
      case "Gaming": return "text-red-600 bg-red-100";
      case "Accessories": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading amazing products...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 mx-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          ✨ Our Amazing Products ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover our carefully curated collection of premium tech products designed to enhance your digital lifestyle
        </p>
        <div className="mt-8 h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-white text-xs font-bold ${getBadgeColor(product.badge)} shadow-lg`}>
                {product.badge}
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback for broken images
                    e.target.src = `https://via.placeholder.com/400x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? "text-yellow-400" 
                          : i === Math.floor(product.rating) && product.rating % 1 >= 0.5
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                </div>

                {/* Action Button */}
                <Link
                  to={`/product/${product._id}`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </Link>
              </div>

              {/* Decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-95"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Products Found</h3>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L21 21H9m12 0a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
}

export default ProductList;