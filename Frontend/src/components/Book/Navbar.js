// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-xl font-semibold" to="/">Library</Link>
        <div className="flex space-x-4">
          <Link className="text-gray-700 hover:text-gray-900" to="/Dashboard">Dashboard</Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/books">Books</Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/loans">Loans</Link>
          {token && <Link className="text-gray-700 hover:text-gray-900" to="/users">Users</Link>}
        </div>
        <div className="ml-auto">
          {token ? (
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="text-gray-700 hover:text-gray-900" to="/login">Login</Link>
              <Link className="text-gray-700 hover:text-gray-900" to="/signup">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
