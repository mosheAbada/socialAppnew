import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    if (user?.email !== 'moshe@gmail.com') {
      navigate('/'); // Redirect if not admin
    } else {
      fetchUsers();
    }
  }, [navigate, user]);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/deleteUser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full bg-white border border-gray-300 mt-16">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.firstname}</td>
              <td className="py-2 px-4 border-b">{user.lastname}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
