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
    navigate('/AuthPage');
  };

  return (
    <nav className="backdrop-filter backdrop-blur-md  p-4">
      <div className="container mx-auto flex justify-between items-center space-x-8">
        <Link className="text-xl text-white mr-8 hover:no-underline font-bold no-underline" to="/">Library</Link>
        <div className="flex space-x-8">
          <Link className="text-gray-300 hover:text-[#d4af7a] hover:border hover:border-transparent px-4 font-bold no-underline" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-300 hover:text-[#d4af7a] hover:border hover:border-transparent px-4 font-bold no-underline" to="/books">Books</Link>
          <Link className="text-gray-300 hover:text-[#d4af7a] hover:border hover:border-transparent px-4 font-bold no-underline" to="/loans">Loans</Link>
          <Link className="text-gray-300 hover:text-[#d4af7a] hover:border hover:border-transparent px-4 font-bold no-underline" to="/About">About us</Link>
          
          {token && role === 'admin' && (
            <Link className="text-gray-300 hover:text-[#d4af7a] hover:border hover:border-transparent hover:rounded px-4 font-bold no-underline" to="/users">Users</Link>
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
              <Link className="text-white bg-[#d4af7a]  border-transparent rounded px-4 py-2 font-bold no-underline" to="/AuthPage">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
