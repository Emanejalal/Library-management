// EditBook.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8084/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8084/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate(`/books/${id}`);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <div className="container my-5">
      <div className="edit-book bg-gray-100 p-6 rounded-lg">
        <h3 className="text-center text-2xl mb-4">Edit Book</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" id="author" name="author" value={book.author} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="genre">Genre</label>
            <input type="text" className="form-control" id="genre" name="genre" value={book.genre} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="year">Year</label>
            <input type="number" className="form-control" id="year" name="year" value={book.year} onChange={handleChange} />
          </div>
 
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
