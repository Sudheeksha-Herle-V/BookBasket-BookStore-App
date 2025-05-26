import React, { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("Users"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:4001/orders/user/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-pink-600 mb-12 text-center">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order #{index + 1}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <ul className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-3 flex justify-between text-gray-700 text-base"
                  >
                    <span className="font-medium">
                      {item.bookId?.name || "Book"} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      ₹{item.bookId?.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-right text-lg font-bold text-pink-600">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
