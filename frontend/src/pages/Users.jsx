import React, { useEffect, useState } from "react";
import API from "../../api";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState({
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);
//   }, []);

//   const handleRemove = (id) => {
//     const updatedCart = cartItems.filter((item) => item._id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleCheckout = async () => {
//     if (
//       !shippingAddress.address ||
//       !shippingAddress.city ||
//       !shippingAddress.postalCode ||
//       !shippingAddress.country
//     ) {
//       alert("Please fill in all shipping details before checkout.");
//       return;
//     }

//     const products = cartItems.map((item) => ({
//       productId: item._id,
//       quantity: item.quantity,
//     }));

//     const totalPrice = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     try {
//       await API.post("/orders", {
//         products,
//         shippingAddress,
//         totalPrice,
//       });

//       alert("Order placed successfully!");
//       setCartItems([]);
//       localStorage.removeItem("cart");
//     } catch (err) {
//       console.error("Checkout failed:", err);
//       alert("Failed to place order.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4"
//             >
//               <div>
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p>Qty: {item.quantity}</p>
//                 <p>${item.price}</p>
//               </div>
//               <button
//                 onClick={() => handleRemove(item._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Shipping Address Form */}
//           <div className="bg-gray-100 p-4 rounded-lg mb-4">
//             <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//             <input
//               type="text"
//               placeholder="Address"
//               value={shippingAddress.address}
//               onChange={(e) =>
//                 setShippingAddress({
//                   ...shippingAddress,
//                   address: e.target.value,
//                 })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={shippingAddress.city}
//               onChange={(e) =>
//                 setShippingAddress({ ...shippingAddress, city: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Postal Code"
//               value={shippingAddress.postalCode}
//               onChange={(e) =>
//                 setShippingAddress({
//                   ...shippingAddress,
//                   postalCode: e.target.value,
//                 })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               value={shippingAddress.country}
//               onChange={(e) =>
//                 setShippingAddress({
//                   ...shippingAddress,
//                   country: e.target.value,
//                 })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />
//           </div>

//           {/* Checkout Button */}
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Checkout
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      await API.get()
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {/* User list or details go here */}
    </div>
  );
}

export default Users;
