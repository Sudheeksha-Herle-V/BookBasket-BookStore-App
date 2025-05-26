import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/AdminHome/Sidebar"; 

function AdminOrdersPage({ type = "Pending" }) {
  const [orders, setOrders] = useState([]);

  const endpointMap = {
    Pending: "all",
    Shipped: "shipped",
    Delivered: "delivered",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4001/orders/admin/orders/${endpointMap[type]}`)
      .then((res) => setOrders(res.data))
      .catch((err) => toast.error("Failed to load orders"));
  }, [type]);

  const markShipped = async (id) => {
    await axios.put(`http://localhost:4001/orders/admin/orders/${id}/mark-shipped`);
    toast.success("Marked as Shipped");
    setOrders(orders.filter(order => order._id !== id));
  };

  const markDelivered = async (id) => {
    await axios.put(`http://localhost:4001/orders/admin/orders/${id}/mark-delivered`);
    toast.success("Marked as Delivered");
    setOrders(orders.filter(order => order._id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full px-6 py-10 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-pink-600 mb-10 text-center">{type} Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No {type.toLowerCase()} orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow border">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  {type === "Pending" && (
                    <button
                      onClick={() => markShipped(order._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Mark as Shipped
                    </button>
                  )}

                  {type === "Shipped" && (
                    <button
                      onClick={() => markDelivered(order._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-gray-700 mb-4">
                  <p><strong>Name:</strong> {order.customer?.name}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone}</p>
                  <p><strong>Address:</strong> {order.customer?.address}</p>
                </div>

                <ul className="divide-y divide-gray-100 mb-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1">
                      <span>{item.bookId?.name || "Unknown"} × {item.quantity}</span>
                      <span>₹{item.bookId?.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-right font-bold text-pink-600">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
