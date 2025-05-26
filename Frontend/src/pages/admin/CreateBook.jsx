import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      name,
      price: Number(price),
      category,
      image,
      title,
      count: Number(count),
    };
    setLoading(true);
    axios
      .post("http://localhost:4001/book", data)
      .then(() => {
        console.log("BOOK CREATED"); // check this
        enqueueSnackbar('Book Created Successfully', { variant: 'success' });
        navigate('/admin');
      })
      .catch((error) => {
        console.log("BOOK CREATION FAILED"); // check this
        enqueueSnackbar('Error creating book', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Create Book
      </h1>
      <div className="bg-white border-2 border-pink-600 rounded-2xl w-full max-w-2xl p-6 mx-auto shadow-lg">
        <Input label="Name" value={name} setValue={setName} />
        <Input label="Price" type="number" value={price} setValue={setPrice} />
        <Input label="Category" value={category} setValue={setCategory} />
        <Input label="Image URL" value={image} setValue={setImage} />
        <Input label="Title (Short Description)" value={title} setValue={setTitle} />
        <Input label="Count" type="number" value={count} setValue={setCount} />
        <button
          className="w-full py-3 mt-6 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition"
          onClick={handleSaveBook}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Book"}
        </button>
      </div>
    </div>
  );
};

// Reusable input component with updated styles
const Input = ({ label, value, setValue, type = "text" }) => (
  <div className="my-4">
    <label className="block mb-2 text-md font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
    />
  </div>
);

export default CreateBook;
