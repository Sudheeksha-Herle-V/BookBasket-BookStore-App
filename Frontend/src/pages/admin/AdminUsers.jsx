import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.fullname?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('http://localhost:4001/user')
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => {
        enqueueSnackbar('Error fetching users', { variant: 'error' });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const deleteUser = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    axios
      .delete(`http://localhost:4001/user/${id}`)
      .then(() => {
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        fetchUsers();
      })
      .catch((err) => {
        enqueueSnackbar('Error deleting user', { variant: 'error' });
        console.error(err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-medium text-pink-500 animate-pulse">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-10 drop-shadow-sm">
          User Management
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white w-full max-w-md mx-auto block p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No matching users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-800 mb-1">{user.fullname || user.name}</p>
                  <p className="text-gray-700 mb-1">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Joined: {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="mt-4 w-full bg-pink-600 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
