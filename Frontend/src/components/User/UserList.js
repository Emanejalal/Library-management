import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log('Deleting user with ID:', userId);
    try {
      const response = await fetch(`http://localhost:8084/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <div className="relative grid min-h-[500px] bg-white p-5 shadow-lg rounded-2xl">
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-semibold text-blue-900">User List</h2>
        </div>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-blue-900 hover:text-white">
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2 text-right">
                    <button
                      className="relative py-1.5 px-3 bg-blue-900 text-white no-underline rounded-md"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserList;
