import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../components/main/Cards";
import axios from "axios";

const categories = [
  {
    name: "Self-help",
    image: "https://99bookstores.com/cdn/shop/collections/99_store.png?v=1697549765&width=1000",
    path: "/category/self-help",
  },
  {
    name: "Romance",
    image: "https://99bookstores.com/cdn/shop/collections/romance.webp?v=1698428388&width=1000",
    path: "/category/romance",
  },
  {
    name: "Mythology",
    image: "https://99bookstores.com/cdn/shop/collections/mythology.png?v=1698305189",
    path: "/category/mythology",
  },
  {
    name: "Biography & Autobiography",
    image: "https://99bookstores.com/cdn/shop/collections/61gC1cVToDL._SL1134.jpg?v=1698418201",
    path: "/category/Biography",
  },
];

function Books() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container md:px-20 px-4 bg-white">
      <div className="mt-[104px] items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Collections</h1>
      </div>

      {/* Category Boxes */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
  {categories.map((cat, index) => (
    <Link
      to={cat.path}
      key={index}
      className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
    >
      <div className="w-64 h-64 rounded-md overflow-hidden shadow-md bg-white border">
        <img
          src={cat.image}
          alt={cat.name}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-2 text-sm md:text-base font-medium text-gray-700 text-center">
        {cat.name} →
      </p>
    </Link>
  ))}
</div>


      {/* All Books Below */}
      {/* Books by Category Sections */}
{categories.map((cat, idx) => {
  const filteredBooks = book
    .filter((b) => b.category?.toLowerCase() === cat.name.toLowerCase())
    .slice(0, 4);

  return (
    <div key={idx} className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{cat.name}</h2>
        <Link
          to={cat.path}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((bookItem) => (
            <Cards key={bookItem.id} item={bookItem} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No books found in this category.</p>
        )}
      </div>
    </div>
  );
})}

    </div>
  );
}

export default Books;
