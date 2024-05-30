import React, { useState, useEffect } from 'react';

function RecentCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (userId) => {
    console.log('Deleting user with ID:', userId);
    try {
      const response = await fetch(`http://localhost:8084/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCustomers(customers.filter(customer => customer.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>User List</h2>
      </div>
      <table>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td width="60px">
              </td>
              <td>
                <h4>{customer.email}</h4>
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentCustomers;
