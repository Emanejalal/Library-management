// AddBookForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire au backend pour ajouter le livre à la liste
    fetch('http://localhost:8084/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/books');
    })
    .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="container my-5">
      <div className="add-book-form bg-gray-100 p-6 rounded-lg">
        <h2 className="text-center text-2xl mb-4">Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" id="author" name="author" value={formData.author} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="genre">Genre</label>
            <input type="text" className="form-control" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="year">Year</label>
            <input type="text" className="form-control" id="year" name="year" value={formData.year} onChange={handleChange} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookForm;
