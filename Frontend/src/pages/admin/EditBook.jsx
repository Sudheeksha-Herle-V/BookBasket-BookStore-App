import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState(0);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4001/book/${id}`)
      .then((res) => {
        const b = res.data;
        setName(b.name || '');
        setTitle(b.title || '');
        setPrice(b.price || '');
        setCategory(b.category || '');
        setCount(b.count || 0);
        setImage(b.image || '');
      })
      .catch((err) => {
        enqueueSnackbar('Error fetching book data', { variant: 'error' });
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = { name, title, price, category, count, image };

    setLoading(true);
    axios
      .put(`http://localhost:4001/book/${id}`, data)
      .then(() => {
        enqueueSnackbar('Book updated successfully', { variant: 'success' });
        navigate('/admin');
      })
      .catch((err) => {
        enqueueSnackbar('Failed to update book', { variant: 'error' });
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border-2 border-pink-600 rounded-2xl w-full max-w-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Edit Book</h1>

        <Input label="Name" value={name} onChange={setName} />
        <Input label="Title" value={title} onChange={setTitle} />
        <Input label="Price" value={price} onChange={setPrice} />
        <Input label="Category" value={category} onChange={setCategory} />
        <Input label="Stock Count" type="number" value={count} onChange={(val) => setCount(Number(val))} />
        <Input label="Image URL" value={image} onChange={setImage} />

        <button
          onClick={handleEditBook}
          disabled={loading}
          className="w-full py-3 mt-6 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = 'text' }) => (
  <div className="my-4">
    <label className="block mb-2 text-md font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
    />
  </div>
);

export default EditBook;
