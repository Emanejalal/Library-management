import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentCustomers from './User';

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
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Book List</h2>
        </div>
        {error ? (
          <div className="error text-red-500 text-center">{error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Author</td>
                <td>Genre</td>
                <td>Year</td>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.year}</td>
                  <td>
                  </td>
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
  );
}

export default BookList;
