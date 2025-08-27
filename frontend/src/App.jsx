import "./App.css";
import Home from "./pages/Home";
import Orders from "./pages/MyOrders";
import MyOrders from "./pages/MyOrders";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import Profile from "./components/Profile";
import AdminOrders from "./pages/AdminOrders";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
    <Routes>
      {/* Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main Routes */}
      <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/myOrders" element={<Orders />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<MyOrders />} />


      {/* admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />

      </Route>
    </Routes>
    </>
  );
}

export default App;
