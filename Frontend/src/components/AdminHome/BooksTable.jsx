import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse shadow-md rounded-lg overflow-hidden">
        <thead className="bg-pink-100 text-pink-800">
          <tr>
            <th className="py-3 px-4 border border-pink-200 text-center">No</th>
            <th className="py-3 px-4 border border-pink-200 text-left">Name</th>
            <th className="py-3 px-4 border border-pink-200 text-center">Category</th>
            <th className="py-3 px-4 border border-pink-200 text-center">Price</th>
            <th className="py-3 px-4 border border-pink-200 text-center">Count</th>
            <th className="py-3 px-4 border border-pink-200 text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-pink-50 transition-colors"
            >
              <td className="py-2 px-4 text-center border border-pink-100">
                {index + 1}
              </td>
              <td className="py-2 px-4 text-left border border-pink-100">
                {book.name}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100">
                {book.category}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100">
                ₹{book.price}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100">
                {book.count}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100">
                <div className="flex justify-center gap-3 text-xl">
                  <Link to={`/admin/ShowBook/${book._id}`} title="Info">
                    <BsInfoCircle className="text-yellow-600 hover:text-yellow-800" />
                  </Link>
                  <Link to={`/admin/EditBook/${book._id}`} title="Edit">
                    <AiOutlineEdit className="text-green-600 hover:text-green-800" />
                  </Link>
                  <Link to={`/admin/DeleteBook/${book._id}`} title="Delete">
                    <MdOutlineDelete className="text-red-600 hover:text-red-800" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
