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

  const containerStyle = {
    backgroundColor: '#1', // couleur marron clair
    padding: '1.5rem',
    borderRadius: '0.5rem',
    height: '100vh', // Prendre toute la hauteur de la page
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const listStyle = {
    flex: 1,
    overflowY: 'auto', // Pour permettre le défilement si le contenu dépasse la hauteur
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '1rem 0',
  };

  const bookInfoStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
  };

  const deleteButtonStyle = {
    backgroundColor: '#CFB595', // couleur marron
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const deleteButtonHoverStyle = {
    backgroundColor: '#8B4513', // couleur marron foncé
  };

  const addButtonStyle = {
    backgroundColor: '#BB9351', // couleur marron
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const addButtonHoverStyle = {
    backgroundColor: '#8B4513', // couleur marron foncé
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 className="text-center text-2xl">Book List</h2>
        <Link 
          to="/add-book" 
          style={addButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = addButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = addButtonStyle.backgroundColor}
        >
          Add Book
        </Link>
      </div>
      {error ? (
        <div className="error text-red-500 text-center">{error}</div>
      ) : (
        <ul style={listStyle}>
          {books.map(book => (
            <li key={book.id} style={listItemStyle}>
              <div style={bookInfoStyle}>
                <Link to={`/books/${book.id}`} style={linkStyle}>
                  <div>
                    <strong>{book.title}</strong> by {book.author}
                  </div>
                  <div className="text-sm text-gray-500">{book.genre} ({book.year})</div>
                </Link>
              </div>
              <div style={buttonContainerStyle}>
                <Link to={`/edit-book/${book.id}`} className="btn btn-secondary">Edit</Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  style={deleteButtonStyle}
                  onMouseOver={(e) => e.target.style.backgroundColor = deleteButtonHoverStyle.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = deleteButtonStyle.backgroundColor}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
