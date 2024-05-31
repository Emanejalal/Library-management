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
          <h2 className="font-semibold ml-2 text-4xl text-[#d4af7a]">Book List</h2>
          <Link to="/add-book" className="relative font-bold py-1.5 px-5 mx-5 bg-slate-500 text-white no-underline rounded-md">
            Add Book
          </Link>
        </div>
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
                <th className="px-6 py-3 font-bold text-lg text-center text-gray-500 uppercase tracking-wider">Actions</th>
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
                    <Link to={`/add-loan/${book.id}`} className="btn btn-secondary ml-2 w-24">Loan</Link>
                    <Link to={`/edit-book/${book.id}`} className="btn btn-secondary ml-2 w-24">Edit</Link>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-secondary ml-2 w-24">Delete</button>
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
