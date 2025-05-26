import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'; 


const Cart = ({ userId }) => {
  const [cart, setCart] = useState({ items: [] });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`http://localhost:4001/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => enqueueSnackbar('Error loading cart', { variant: 'error' }));
  }, [userId]);

  const removeItem = (bookId) => {
    axios.delete(`http://localhost:4001/cart/${userId}/${bookId}`)
      .then(res => {
        setCart(res.data);
        enqueueSnackbar('Item removed', { variant: 'info' });
      });
  };
  const navigate = useNavigate();
  const checkout = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map(({ bookId, quantity }) => (
              <div key={bookId._id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow">
                <div>
                  <h2 className="text-lg font-semibold">{bookId.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(bookId._id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
>
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
