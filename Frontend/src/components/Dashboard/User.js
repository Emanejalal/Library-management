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
    <div className="bg-white p-5 rounded-lg">
      <div className="cardHeader mb-1">
        <h2 className="text-4xl text-[#d4af7a] my-[20px]">User List</h2>
      </div>
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        <table className="w-full">
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b last:border-0 transition-colors duration-500 hover:bg-gray-700 hover:text-white">
                <td className="py-3 px-2 w-5">
                  <div className="relative w-4 h-10 rounded-full overflow-hidden">
                    {/* Placeholder for user image if you have any */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentCustomers;
