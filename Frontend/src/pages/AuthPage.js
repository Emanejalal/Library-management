// AuthPage.jsx
import React, { useState } from 'react';
import '../AuthPage.css'; // Make sure to include the CSS file

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('user'); // Default role is user

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
      <div className="form sign-in">
        <h2>Welcome</h2>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <button type="button" className="submit">Sign In</button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={toggleSignUp}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Create your Account</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <label>
            <span>Confirm Password</span>
            <input type="password" />
          </label>
          <label>Role:</label>
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          <button type="button" className="submit">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
