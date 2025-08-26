import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";

export default function Navbar({ role, onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
        {/* Logo */}
        <div
          className="text-3xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() =>
            role === "admin" ? navigate("/admin") : navigate("/")
          }
        >
          SnapCart
        </div>

        {/* Admin Links */}
        {role === "admin" && (
          <div className="flex items-center gap-8 text-lg">
            <Link
              to="/admin/products"
              className="hover:text-yellow-300 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="hover:text-yellow-300 transition-colors"
            >
              Orders
            </Link>
          </div>
        )}

        {/* Search Bar (Only for Users) */}
        {role === "user" && (
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full p-3 pl-4 pr-10 text-white outline-none border-none rounded-full bg-gray-900/60 backdrop-blur-md placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 transition"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-300" />
            </div>
          </div>
        )}

        {/* Right Section: Cart + Orders + Profile + Logout */}
        {role && (
          <div className="flex items-center gap-6">
            {role === "user" && (
              <>
                {/* Cart */}
                <div
                  className="relative cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart className="text-2xl" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                </div>

                {/* My Orders */}
                <Link
                  to="/orders"
                  className="hover:text-yellow-300 transition-colors"
                >
                  My Orders
                </Link>
              </>
            )}

            {/* Profile */}
            <FaUser
              className="text-2xl cursor-pointer hover:text-yellow-300 transition-colors"
              onClick={() => navigate("/profile")}
            />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full font-medium transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
