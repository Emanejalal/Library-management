import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentCustomers from './User';
import { jwtDecode } from 'jwt-decode'; // Correct named import

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetch('http://localhost:8084/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => setError(error.toString()));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8084/api/books/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => setError(error.toString()));
  };

  return (
    <div>
      {role === 'user' && (
        <div>
          <div className="recentOrders">
            <div className="cardHeader">
              <h2 className='text-4xl text-[#d4af7a] my-14'>Book List</h2>
            </div>
            {error ? (
              <div className="error text-red-500 text-center">{error}</div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#ebdece]">
                    <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Genre</th>
                    <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id} className="border-b last:border-0">
                      <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      {role === 'admin' && (
        <div className="details"> 
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Book List</h2>
            </div>
            {error ? (
              <div className="error text-red-500 text-center">{error}</div>
            ) : (
              <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ebdece]">
                <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 font-bold text-lg text-right text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 font-bold text-lg text-center text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 font-bold text-lg text-right text-gray-500 uppercase tracking-wider">Year</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
            )}
          </div>
          <div className="recentCustomers">
            <RecentCustomers />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
