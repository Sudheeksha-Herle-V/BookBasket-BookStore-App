import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdReply } from 'react-icons/md';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    axios
      .get('http://localhost:4001/contact')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching messages:', err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      axios
        .delete(`http://localhost:4001/contact/${id}`)
        .then(() => fetchMessages())
        .catch((err) => console.error('Error deleting message:', err));
    }
  };


  if (loading) {
    return <div className="p-4 text-gray-500 text-center">Loading messages...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-xl border border-pink-100 p-5 shadow-md hover:shadow-lg transition-all"
            >
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium text-pink-700">Name:</span> {msg.name}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium text-pink-700">Email:</span> {msg.email}
              </p>
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-medium text-pink-700">Message:</span> {msg.message}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Sent: {new Date(msg.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-between mt-3">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}&su=Replying to your message&body=Hi ${msg.name},%0AReplying to your query [%22${msg.message}%22]%0A%0AReply:`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Reply
                </a>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="flex items-center gap-2 bg-pink-600 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow-sm"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
