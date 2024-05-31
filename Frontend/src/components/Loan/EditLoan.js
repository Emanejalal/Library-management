import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditLoan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const loanResponse = await fetch(`http://localhost:8084/api/loans/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!loanResponse.ok) {
          throw new Error('Network response was not ok ' + loanResponse.statusText);
        }
        const loanData = await loanResponse.json();
        setLoan(loanData);

        const booksResponse = await fetch(`http://localhost:8084/api/books`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!booksResponse.ok) {
          throw new Error('Network response was not ok ' + booksResponse.statusText);
        }
        const booksData = await booksResponse.json();
        setBooks(booksData);

        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching loan details.');
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8084/api/loans/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(loan)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      navigate('/loans');
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while updating the loan.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoan(prevLoan => ({ ...prevLoan, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto my-10">
      <div className="relative grid min-h-[500px] bg-white p-5 shadow-lg rounded-2xl">
        <h2 className="font-semibold text-[#d4af7a] mb-5">Edit Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookId">
              Book
            </label>
            <select
              id="bookId"
              name="bookId"
              value={loan ? loan.bookId : ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={!loan}
            >
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanDate">
              Loan Date
            </label>
            <input
              type="date"
              id="loanDate"
              name="loanDate"
              value={loan && loan.loanDate ? loan.loanDate.split('T')[0] : ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={!loan}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnDate">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={loan && loan.returnDate ? loan.returnDate.split('T')[0] : ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={!loan}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-slate-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={!loan}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLoan;