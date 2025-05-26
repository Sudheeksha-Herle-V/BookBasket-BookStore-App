import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck } from "react-icons/bs";
import Login from "../../pages/main/Login";
import Logout from "./Logout";
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthProvider";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  let hideTimeout;

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(null);
    navigate("/");
  };
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("Users"));
  const userId = user?._id;

  if (userId) {
    fetch(`http://localhost:4001/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const total = data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => setCartCount(0));
  }
}, []);


  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/books">Books</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/admin-login">Admin</a></li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black fixed top-0 left-0 right-0 z-50 ${
        sticky ? "shadow-md transition-all duration-300" : ""
      }`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-black"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-4xl font-bold italic cursor-pointer">BookBasket</a>
        </div>

        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          {authUser && (
  <div
    className="relative cursor-pointer text-xl"
    onClick={() => navigate("/cart")}
    title="View Cart"
  >
    <FiShoppingCart className="text-black text-4xl pr-4" />
    {authUser && (
      <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  {cartCount}
</span>

    )}
  </div>
)}

          {authUser ? (
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(hideTimeout);
                setShowDropdown(true);
              }}
              onMouseLeave={() => {
                hideTimeout = setTimeout(() => setShowDropdown(false), 2000);
              }}
            >
              <button className="flex items-center gap-2  text-black px-3 py-2 rounded-md duration-300 cursor-pointer">
                <FiUser className="text-lg" />
                Account
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 flex flex-col bg-white shadow-lg rounded-md text-sm text-black w-40 z-50 border">
                  <button
                    onClick={() => navigate("/orders")}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <BsClipboardCheck /> View Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <a
                className="bg-pink-600 text-white px-3 py-2 rounded-md duration-300 cursor-pointer"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </a>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
