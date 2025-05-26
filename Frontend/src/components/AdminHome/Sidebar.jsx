import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 text-gray-800 shadow-md">
      <div className="h-full overflow-y-auto p-6 pt-[10px] scrollbar-hide">

        {/* Sticky Admin Panel Heading */}
        <div className="sticky top-0 bg-white z-10 pb-4 pt-[10px] border-b border-pink-200">
  <h2 className="text-2xl font-bold text-pink-600">Admin Panel</h2>
</div>


        {/* Books Section */}
        <div className="mb-8 mt-6">
          <h3 className="text-lg font-semibold text-pink-600">Books</h3>
          <hr className="border-pink-300 my-2" />
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/CreateBook"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Create Book
              </Link>
            </li>
            {/* <li>
              <Link
                to="/admin/outofstock"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Out of Stock
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-pink-600">Orders</h3>
          <hr className="border-pink-300 my-2" />
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/orders"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders/shipped"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Shipped
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders/delivered"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Delivered
              </Link>
            </li>
          </ul>
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-pink-600">Users</h3>
          <hr className="border-pink-300 my-2" />
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/users"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                User Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/messages"
                className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
              >
                Messages
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
