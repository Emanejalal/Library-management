// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Books from './pages/Books';
import Navbar from './components/Navbar';
import Detaille from './components/Book/BookDetails';
import UserList from './components/User/UserList';
import EditBook from './components/others/EditBook';
import AddLoan from './components/Loan/AddLoan';
import AddBookForm from './components/Book/AddBookForm'; // Importer le composant AddBookForm
import Loans from './pages/Loans';
import AuthPage from './pages/AuthPage';
import EditLoan from './components/Loan/EditLoan';
import About from './pages/About';
const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/AuthPage" />;
};

function MainContent() {
  const location = useLocation();
  const shouldShowNavbar = !['/dashboard', '/login', '/signup'].includes(location.pathname);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/About" element={<About/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/books/:id" element={<PrivateRoute><Detaille /></PrivateRoute>} />
        <Route path="/edit-book/:id" element={<PrivateRoute><EditBook /></PrivateRoute>} />
        <Route path="/add-loan/:id" element={<PrivateRoute><AddLoan /></PrivateRoute>} />
        <Route path="/edit-loan/:id" element={<PrivateRoute><EditLoan /></PrivateRoute>} />
        <Route path="/add-book" element={<PrivateRoute><AddBookForm /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/loans" element={<PrivateRoute><Loans /></PrivateRoute>} />


      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
