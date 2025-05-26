import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-pink-600 mb-1">
              {book.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{book.title}</p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Category:</span> {book.category}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Price:</span> ₹{book.price}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Count:</span> {book.count}
            </p>
          </div>

          {/* Operation Buttons */}
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
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
