import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdCategory, MdAttachMoney } from "react-icons/md";

const BookModel = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-xl shadow-lg p-6 relative"
      >
        <AiOutlineClose
          className="absolute right-4 top-4 text-2xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex gap-6">
          {/* Book Image */}
          <div className="w-1/3">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-auto rounded-lg shadow border"
            />
          </div>

          {/* Book Info */}
          <div className="w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-pink-600">{book.name}</h2>
            <p className="text-gray-600 text-sm italic">{book.title}</p>

            <div className="flex items-center gap-2 text-gray-700">
              <MdCategory className="text-pink-500 text-xl" />
              <span>Category: {book.category}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <MdAttachMoney className="text-pink-500 text-xl" />
              <span>Price: ₹{book.price}</span>
            </div>

            <div className="text-sm text-gray-700 font-semibold mt-2">
              Stock Available: <span className="text-pink-600">{book.count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModel;
