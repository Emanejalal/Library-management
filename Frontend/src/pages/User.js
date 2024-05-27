// User.js
import React from 'react';
import UserList from '../components/User/UserList';

function User() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User List</h2>
      <UserList />
    </div>
  );
}

export default User;
