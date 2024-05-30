import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let role;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Use the correct named function
      role = decodedToken.role;
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center space-x-8">
        <Link className="text-xl text-white mr-8 hover:no-underline font-bold no-underline" to="/">Library</Link>
        <div className="flex space-x-8">
          <Link className="text-gray-300 hover:bg-white hover:border hover:border-transparent hover:text-black hover:rounded px-4 py-2 font-bold no-underline" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-300 hover:bg-white hover:border hover:border-transparent hover:text-black hover:rounded px-4 py-2 font-bold no-underline" to="/books">Books</Link>
          <Link className="text-gray-300 hover:bg-white hover:border hover:border-transparent hover:text-black hover:rounded px-4 py-2 font-bold no-underline" to="/loans">Loans</Link>
          {token && role === 'admin' && (
            <Link className="text-gray-300 hover:bg-white hover:border hover:border-transparent hover:text-black hover:rounded px-4 py-2 font-bold no-underline" to="/users">Users</Link>
          )}
        </div>
        <div className="ml-auto flex space-x-8">
          {token ? (
            <button
              className="text-gray-300 hover:text-white px-4 py-2 font-bold no-underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="text-black bg-white border border-transparent rounded px-4 py-2 font-bold no-underline" to="/login">Login</Link>
              <Link className="text-black bg-white border border-transparent rounded px-4 py-2 font-bold no-underline" to="/signup">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
