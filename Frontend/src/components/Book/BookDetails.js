// Detaille.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditBook from '../others/EditBook';

function Detaille() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8084/api/books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:8084/api/books/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/books');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (!book) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundImage: `url('')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-3xl font-bold text-center mb-4">{book.title} Details</h2>
        <div>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <div className="flex justify-center mt-6">
            <button onClick={() => navigate(`/edit-book/${id}`)} className="btn-primary mr-4 px-4 py-2 rounded-lg hover:bg-blue-1000">Edit</button>
            <button onClick={handleDelete} className="btn-danger px-4 py-2 rounded-lg hover:bg-red-500">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detaille;
