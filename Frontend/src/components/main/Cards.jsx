import React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import toast from "react-hot-toast";

function Cards({ item, userId }) {
  const { enqueueSnackbar } = useSnackbar();
  const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("Users"));
    return user?._id;
  } catch {
    return null;
  }
};

  const handleAddToCart = async () => {
  const userId = getUserId();
  if (!userId) {
    toast.error("Please log in first");
    return;
  }

  try {
    await axios.post(
      "http://localhost:4001/cart",
      {
        userId,
        bookId: item._id,
      },
      { withCredentials: true }
    );
    toast.success("Added to cart");
  } catch (err) {
    console.error("Add to cart error:", err);
    toast.error("Failed to add to cart");
  }
  
};


  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg overflow-hidden border mx-2 my-4">
      <img src={item.image} alt={item.name} className="w-full h-60 object-contain p-4" />
      <div className="px-4 pb-4">
        <h2 className="font-semibold text-md mt-2 h-14 overflow-hidden">{item.name}</h2>
        <p className="text-sm text-gray-600 h-12 overflow-hidden">{item.title}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-pink-600 font-bold text-lg">₹{item.price}</span>
          {item.outOfStock ? (
  <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded">
    Out of Stock
  </button>
) : (
  <button className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-3 py-1 rounded-full text-sm transition-colors duration-300" onClick={handleAddToCart}>Add to Cart</button>
)}
            
          
        </div>
      </div>
    </div>
  );
}

export default Cards;
