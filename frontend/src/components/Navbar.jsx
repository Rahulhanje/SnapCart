import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar({ role, user, onSearch, onCategoryChange }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div
        className="text-2xl font-bold cursor-pointer text-blue-500"
        onClick={() => (role === "admin" ? navigate("/admin") : navigate("/"))}
      >
        SnapCart
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center mx-6">
        <div className="flex relative w-full max-w-xl">
          {/* Category Dropdown */}
          <select
            className="focus:outline-none focus:ring-0 p-1 bg-gray-300 text-black text-sm border-none border-r-0 rounded-l-xl"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              onCategoryChange && onCategoryChange(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                role === "admin" ? navigate("/admin/products") : navigate("/");
                onSearch && onSearch(searchTerm);
              }
            }}
            placeholder="Search products..."
            className="flex-1 p-2 text-black outline-none border border-gray-600 rounded-r-none bg-gray-200"
          />

          {/* Search Button */}
          <button
            onClick={() => {
              role === "admin" ? navigate("/admin/products") : navigate("/");
              onSearch && onSearch(searchTerm);
            }}
            className="px-4 bg-blue-600 hover:bg-blue-700 rounded-r-xl"
          >
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {role === "admin" && (
          <>
            <Link to="/admin/products" className="hover:underline">
              All Products
            </Link>
            <Link to="/admin/orders" className="hover:underline">
              All Orders
            </Link>
          </>
        )}

        {role === "user" && (
          <>
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-2xl hover:text-gray-400" />
            </div>
            <Link to="/myOrders" className="hover:underline">
              My Orders
            </Link>
          </>
        )}

        {/* User dropdown */}
        {role && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
            >
              <span>{user?.name}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-400"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
