import React, { useState, useEffect } from 'react';

function CardBox() {
  const [bookCount, setBookCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/Bookcount');
        const data = await response.json();
        setBookCount(data.bookCount);
      } catch (error) {
        console.error('Error fetching book count:', error);
      }
    };

    const fetchLoansCount = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/loanscount');
        const data = await response.json();
        setLoansCount(data.loansCount);
      } catch (error) {
        console.error('Error fetching loans count:', error);
      }
    };

    const fetchUsersCount = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/userscount');
        const data = await response.json();
        setUsersCount(data.usersCount);
      } catch (error) {
        console.error('Error fetching users count:', error);
      }
    };

    fetchBookCount();
    fetchLoansCount();
    fetchUsersCount();
  }, []);

  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">{bookCount}</div>
          <div className="cardName">Books</div>
        </div>
        <div className="iconBx">
          <ion-icon name="book-outline"></ion-icon>
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{loansCount}</div>
          <div className="cardName">Loans</div>
        </div>
        <div className="iconBx">
          <ion-icon name="document-outline"></ion-icon>
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{usersCount}</div>
          <div className="cardName">Users</div>
        </div>
        <div className="iconBx">
          <ion-icon name="people-outline"></ion-icon>
        </div>
      </div>
      
    </div>
  );
}

export default CardBox;
