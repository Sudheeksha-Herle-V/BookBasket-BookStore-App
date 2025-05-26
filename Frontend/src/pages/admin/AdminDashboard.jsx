import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/AdminHome/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import "./search.css";
import BooksCard from "../../components/AdminHome/BooksCard";
import BooksTable from "../../components/AdminHome/BooksTable";
import Sidebar from "../../components/AdminHome/Sidebar";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4001/book")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter((book) =>
  book.name?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="ml-64 w-full px-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-wide">
            Admin Dashboard
          </h1>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            className={`px-6 py-2 rounded-lg text-sm font-semibold shadow transition duration-300 ${
              showType === "table"
                ? "bg-pink-600 text-white"
                : "bg-white border border-pink-300 text-pink-600 hover:bg-pink-100"
            }`}
            onClick={() => setShowType("table")}
          >
            Table View
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-sm font-semibold shadow transition duration-300 ${
              showType === "card"
                ? "bg-pink-600 text-white"
                : "bg-white border border-pink-300 text-pink-600 hover:bg-pink-100"
            }`}
            onClick={() => setShowType("card")}
          >
            Card View
          </button>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white max-w-xl px-5 py-3 text-sm rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        {/* Book Display */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        ) : showType === "table" ? (
          <BooksTable books={filteredBooks} />
        ) : (
          <BooksCard books={filteredBooks} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
