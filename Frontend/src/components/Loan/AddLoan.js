import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddLoan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '' });
  const [loanData, setLoanData] = useState({
    loanDate: '',
    returnDate: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8084/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    const userId = localStorage.getItem('userId'); // Assuming you store the userId in localStorage
    fetch('http://localhost:8084/api/loans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: id,
        userId: userId,
        loanDate: loanData.loanDate,
        returnDate: loanData.returnDate
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/loan-list');
      })
      .catch(error => console.error('Error adding loan:', error));
  };

  return (
    <div className="container my-5">
      <div className="add-loan bg-gray-100 p-6 rounded-lg">
        <h3 className="text-center text-[#d4af7a] text-2xl mb-4">Add Loan for {book.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="loanDate">Date of Loan</label>
            <input
              type="date"
              className="form-control"
              id="loanDate"
              name="loanDate"
              value={loanData.loanDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="returnDate">Date of Return</label>
            <input
              type="date"
              className="form-control"
              id="returnDate"
              name="returnDate"
              value={loanData.returnDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-slate-600">Add Loan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLoan;
