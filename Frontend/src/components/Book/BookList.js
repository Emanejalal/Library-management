import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8084/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="relative grid min-h-[500px] bg-white p-5 shadow-lg rounded-2xl overflow-x-auto">
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-semibold text-blue-900">Book List</h2>
          <Link to="/add-book" className="relative py-1.5 px-3 bg-blue-900 text-white no-underline rounded-md">Add Book</Link>
        </div>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/edit-book/${book.id}`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => handleDelete(book.id)} className="btn bg-blue-900 ml-2">Delete</button>
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

export default BookList;
