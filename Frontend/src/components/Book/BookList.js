// BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container my-5">
      <div className="book-list bg-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center text-2xl">Book List</h2>
          <Link to="/add-book" className="btn btn-primary">Add Book</Link>
        </div>
        {error ? (
          <div className="error text-red-500 text-center">{error}</div>
        ) : (
          <ul className="list-group">
            {books.map(book => (
              <li key={book.id} className="list-group-item border-b py-4">
                <Link to={`/books/${book.id}`} className="text-decoration-none">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-blue-500">{book.title}</strong> by {book.author}
                    </div>
                    <div className="text-sm text-gray-500">{book.genre} ({book.year})</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BookList;
