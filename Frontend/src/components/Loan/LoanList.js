import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LoanList() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const token = localStorage.getItem('token'); // Assuming you store your token in localStorage

      try {
        const response = await fetch('http://localhost:8084/api/loans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        const loansWithDetails = await Promise.all(
          data.map(async loan => {
            const userResponse = await fetch(`http://localhost:8084/api/users/${loan.userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const userData = await userResponse.json();

            const bookResponse = await fetch(`http://localhost:8084/api/books/${loan.bookId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const bookData = await bookResponse.json();

            return { ...loan, userName: userData.email, bookName: bookData.title };
          })
        );

        setLoans(loansWithDetails);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching loans.');
      }
    };

    fetchLoanDetails();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <div className="loan-list">
        <h2 className="text-center text-2xl font-bold mb-6">Loan List</h2>
        {error ? (
          <div className="error text-red-500 text-center">{error}</div>
        ) : (
          <ul className="space-y-4">
            {loans.map(loan => (
              <li key={loan.id} className="p-4 bg-white rounded shadow">
                <Link to={`/loans/${loan.id}`} className="text-blue-500 hover:underline">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-lg">{loan.userName || 'Unknown User'}</strong> borrowed <strong>{loan.bookName || 'Unknown Book'}</strong> 
                    </div>
                    <div className="text-gray-500">{new Date(loan.loanDate).toLocaleDateString()}</div>
                  </div>
                  {loan.returnDate && (
                    <div className="text-gray-500">
                      Returned on: {new Date(loan.returnDate).toLocaleDateString()}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LoanList;
