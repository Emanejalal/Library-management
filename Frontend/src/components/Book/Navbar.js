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
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-xl font-semibold text-white mr-4 hover:no-underline" to="/">Library</Link>
        <div className="flex space-x-4">
          <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/Dashboard">Dashboard</Link>
          <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/books">Books</Link>
          <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/loans">Loans</Link>
          {token && <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/users">Users</Link>}
        </div>
        <div className="ml-auto">
          {token ? (
            <button
              className="text-gray-300 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/login">Login</Link>
              <Link className="text-gray-300 hover:text-white hover:bg-white hover:px-2 hover:py-2 hover:border hover:border-transparent hover:rounded" to="/signup">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
