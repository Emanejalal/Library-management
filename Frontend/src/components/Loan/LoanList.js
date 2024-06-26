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

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    try {
      const response = await fetch(`http://localhost:8084/api/loans/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state to remove the deleted loan
      setLoans(loans.filter(loan => loan.id !== id));
    } catch (error) {
      console.error('Error deleting loan:', error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="w-full max-w-screen-lg">
        <div className="relative bg-white p-5 shadow-lg rounded-2xl">
          <div className="flex justify-between items-start mb-5">
            <h2 className="font-semibold text-4xl text-[#d4af7a]">Loan List</h2>
          </div>
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr className="bg-[#ebdece]">
                  <th className="px-6 py-3 text-left font-bold text-lg text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left font-bold text-lg text-gray-500 uppercase tracking-wider">Book</th>
                  <th className="px-6 text-center font-bold text-lg text-gray-500 uppercase tracking-wider">Loan Date</th>
                  <th className="px-6 py-3 text-right font-bold text-lg text-gray-500 uppercase tracking-wider">Return Date</th>
                  <th className="px-6 py-3 text-right font-bold text-lg text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map(loan => (
                  <tr key={loan.id} className="border-b last:border-0 hover:bg-slate-600 hover:text-white">
                    <td className="py-2">{loan.userName || 'Unknown User'}</td>
                    <td className="py-2">{loan.bookName || 'Unknown Book'}</td>
                    <td className="py-2 text-center">{new Date(loan.loanDate).toLocaleDateString()}</td>
                    <td className="py-2 text-right">{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                    <td className="py-2 text-right">
                      <Link to={`/edit-loan/${loan.id}`} className="btn btn-secondary ml-2 w-24">Edit</Link>
                      <button onClick={() => handleDelete(loan.id)} className="btn btn-secondary ml-2 w-24">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanList;
