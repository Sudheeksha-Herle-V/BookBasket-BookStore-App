import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("Users"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:4001/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch(() => toast.error("Failed to load cart"));
  }, [userId]);

  const totalPrice = cart.items?.reduce((sum, item) => {
    return sum + (item.bookId?.price || 0) * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
  if (!customer.name || !customer.phone || !customer.address) {
    return toast.error("Please fill all delivery details");
  }

  setLoading(true);
  try {
    await axios.post(`http://localhost:4001/checkout/${userId}`, {
      ...customer,
      total: totalPrice,
    });
    toast.success("Order placed successfully!");
    navigate("/"); // Redirect to home page after placing order
  } catch (err) {
    toast.error("Checkout failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-pink-600 mb-10 text-center">Checkout</h1>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-10">
            {cart.items.map(({ bookId, quantity }) => (
              <div
                key={bookId._id}
                className="flex justify-between items-center bg-white shadow-md p-5 rounded-xl"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{bookId.name}</h2>
                  <p className="text-sm text-gray-600">
                    ₹{bookId.price} x {quantity}
                  </p>
                </div>
                <p className="text-md font-bold text-gray-900">
                  ₹{bookId.price * quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleChange}
                className="bg-white w-full border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-3 transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={handleChange}
                className="bg-white w-full border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-3 transition"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={customer.address}
                onChange={handleChange}
                className="bg-white w-full border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 rounded-lg px-4 py-3 transition"
                rows={4}
              />
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-200 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Order Summary</h2>
            <div className="text-gray-800 text-md space-y-2">
              <p>
                Total Items: <span className="font-medium">{cart.items.length}</span>
              </p>
              <p>
                Total Price: <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
