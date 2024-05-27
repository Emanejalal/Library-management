import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage from '../images/3.png'; // Assurez-vous d'avoir une image à ce chemin


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${landingImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white', // Couleur du texte en blanc
  padding: '200px',
};
















function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is user
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log({ email, password, confirmPassword, role });

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    fetch('http://localhost:8084/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }) // Include selected role in the request
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server responded with status ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Response from server:', data);
        if (data.success) {
          alert('User added successfully');
          navigate('/login');
        } else {
          alert('Signup failed: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert('Signup failed: ' + error.message);
      });
  };

  return (
    <div style={containerStyle}>
      <div className="container my-5">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Sign Up</button>
        </form>
      </div>
      </div>
  );
}

export default Signup;
