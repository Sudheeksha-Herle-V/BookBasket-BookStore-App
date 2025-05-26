import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      alert("Admin login successful");
      navigate("/admin");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Admin Login</h2>
      <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <input
          type="password"
          placeholder="Admin Password"
          className="w-full mb-4 p-2 border rounded bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-pink-600 text-white p-2 rounded ">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
