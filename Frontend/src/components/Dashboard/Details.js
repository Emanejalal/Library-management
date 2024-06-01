import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import RecentCustomers from './User';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    let decodedRole = '';

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use the correct named function
        decodedRole = decodedToken.role;
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

    setRole(decodedRole);

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

  return (

    <div className="p-5">
      <div className="flex flex-wrap justify-between shadow-lg">
      {(role === 'user') && (
          <div className="w-full lg:w-full">
            <div className="bg-white p-1 rounded-lg mb-5">
              <div className="cardHeader mb-5">
                <h2 className="text-4xl text-[#d4af7a] my-14">Book List</h2>
              </div>
              <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                {error ? (
                  <div className="text-red-500 text-center">{error}</div>
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
                        <tr key={book.id} className="border-b last:border-0 transition-colors duration-500 hover:bg-gray-700 hover:text-white">
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
          </div>
        )}

        {(role === 'admin') && (
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-5 rounded-lg mb-5">
              <div className="cardHeader mb-5">
                <h2 className="text-4xl text-[#d4af7a] my-14">Book List</h2>
              </div>
              <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                {error ? (
                  <div className="text-red-500 text-center">{error}</div>
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
                        <tr key={book.id} className="border-b last:border-0 transition-colors duration-500 hover:bg-gray-700 hover:text-white">
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
          </div>
        )}

        <div className="w-full lg:w-1/2">
          {role === 'admin' && (

            <div className="bg-white p-5 rounded-lg mb-5">
              <RecentCustomers />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookList;
