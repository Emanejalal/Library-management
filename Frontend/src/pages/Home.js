// Home.js
import React from 'react';
import BookList from '../components/Book/BookList';
import LoanList from '../components/Loan/LoanList';
import UserList from '../components/User/UserList';
function Home() {


  return (

    <div className="container my-5">
      <BookList />
      <LoanList />
      <UserList />
    </div>

  );

}

export default Home;
