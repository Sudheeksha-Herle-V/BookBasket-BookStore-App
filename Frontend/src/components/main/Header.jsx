import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between items-center bg-sky-900 p-4">
      <h1 className="text-white text-2xl font-bold">BookStore</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/about" className="text-white hover:underline">About</Link>
        <Link to="/contact" className="text-white hover:underline">Contact</Link>
        <Link to="/login" className="text-white hover:underline">Login</Link>
        <Link to="/admin-login" className="text-white hover:underline">Admin</Link>
      </div>
    </nav>
  );
};

export default Header;
