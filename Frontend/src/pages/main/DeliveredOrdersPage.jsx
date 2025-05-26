import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DeliveredOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/orders/admin/orders/delivered")
      .then(res => setOrders(res.data))
      .catch(() => toast.error("Failed to load delivered orders"));
  }, []);

  return (
    <div className="ml-64 p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Delivered Orders</h1>
      {orders.length === 0 ? <p>No delivered orders yet.</p> : (
        orders.map(order => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-bold mb-2">Order #{order._id.slice(-5)}</h2>
            <p className="text-sm text-gray-500 mb-4">{new Date(order.createdAt).toLocaleString()}</p>
            <div className="text-gray-700">
              <p><b>Customer:</b> {order.customer?.name}</p>
              <p><b>Phone:</b> {order.customer?.phone}</p>
              <p><b>Address:</b> {order.customer?.address}</p>
            </div>
            <ul className="mt-4 divide-y">
              {order.items.map((item, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span>{item.bookId?.name} × {item.quantity}</span>
                  <span>₹{item.bookId?.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold text-pink-600 mt-4">Total: ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DeliveredOrdersPage;
