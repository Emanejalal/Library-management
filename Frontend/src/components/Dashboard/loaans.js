import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Loaans() {
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
      <div className="relative grid min-h-[500px] bg-white p-5 shadow-lg rounded-2xl">
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-semibold text-blue-900">Loan List</h2>
        </div>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <td className="font-semibold">User</td>
                <td className="font-semibold">Book</td>
                <td className="font-semibold">Loan Date</td>
                <td className="font-semibold">Return Date</td>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan.id} className="border-b last:border-0 hover:bg-blue-900 hover:text-white">
                  <td className="py-2">{loan.userName || 'Unknown User'}</td>
                  <td className="py-2">{loan.bookName || 'Unknown Book'}</td>
                  <td className="py-2 text-center">{new Date(loan.loanDate).toLocaleDateString()}</td>
                  <td className="py-2 text-right">{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Loaans;