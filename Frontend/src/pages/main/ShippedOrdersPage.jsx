import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ShippedOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get("http://localhost:4001/orders/admin/orders/shipped")
      .then(res => setOrders(res.data))
      .catch(() => toast.error("Failed to load shipped orders"));
  };

  useEffect(fetchOrders, []);

  const handleMarkDelivered = async (orderId) => {
    await axios.put(`http://localhost:4001/orders/admin/orders/mark-delivered/${orderId}`);
    toast.success("Marked as Delivered");
    fetchOrders();
  };

  return (
    <div className="ml-64 p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Shipped Orders</h1>
      {orders.length === 0 ? <p>No shipped orders.</p> : (
        orders.map(order => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Order #{order._id.slice(-5)}</h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleMarkDelivered(order._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Mark as Delivered
              </button>
            </div>
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

export default ShippedOrdersPage;
