import React, { useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/book?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <>
      {/* Search Icon Button */}
      <div className="flex justify-end pr-6 pt-8 pb-4 top-16">
        <IoSearchSharp
          size={24}
          className="cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
      </div>

      {/* Search Overlay Bar */}
      {showSearch && (
        <div className="fixed top-16 left-0 w-full bg-white z-50 p-4 shadow-md flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border border-black px-4 py-2 w-1/2 bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <IoSearchSharp
            size={20}
            className="cursor-pointer"
            onClick={handleSearch}
          />
          <RxCross2
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setShowSearch(false);
              setQuery("");
              setResults([]);
            }}
          />
        </div>
      )}

      {/* Search Results */}
      <div className="flex flex-wrap justify-center mt-4">
        {results.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default SearchBar;
