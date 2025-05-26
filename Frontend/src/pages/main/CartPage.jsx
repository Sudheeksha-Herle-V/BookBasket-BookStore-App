import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

function CartPage() {
  const [cart, setCart] = useState({ items: [] });
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

  const removeItem = async (bookId) => {
    try {
      const res = await axios.delete(`http://localhost:4001/cart/${userId}/${bookId}`);
      setCart(res.data);
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (bookId, action) => {
    try {
      const res = await axios.put(`http://localhost:4001/cart/${userId}`, {
        bookId,
        action,
      });
      setCart(res.data);
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const checkout = () => {
    navigate("/checkout");
  };

  // Safely calculate total
  const totalPrice = cart.items.reduce((sum, item) => {
    if (!item.bookId) return sum;
    return sum + item.bookId.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Your cart is empty.
            <br />
            <button
              onClick={() => navigate("/")}
              className="text-pink-600 hover:underline mt-4 block"
            >
              Go back to shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-10">
              {cart.items.map(({ bookId, quantity }, idx) => {
                if (!bookId) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-red-50 p-4 rounded-xl shadow"
                    >
                      <p className="text-red-600 font-semibold">
                        ⚠️ This book is no longer available.
                      </p>
                      <button
                        onClick={() => removeItem("unknown")}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={bookId._id}
                    className="flex items-center justify-between bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={bookId.image}
                        alt={bookId.name}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-gray-800">{bookId.name}</h2>
                        <p className="text-sm text-gray-500">{bookId.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(bookId._id, "decrease")}
                            className="p-1 text-pink-600 hover:text-pink-800"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="text-gray-700 font-medium">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(bookId._id, "increase")}
                            className="p-1 text-pink-600 hover:text-pink-800"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          Price: ₹{bookId.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(bookId._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary & Checkout */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Total Items:</span>
                <span className="font-medium">
                  {cart.items.filter((item) => item.bookId).length}
                </span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg mb-6">
                <span>Total Price:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                disabled={cart.items.length === 0 || totalPrice === 0}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                Checkout Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
