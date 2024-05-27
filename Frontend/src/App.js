// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Books from './pages/Books';
import Navbar from './components/Book/Navbar';
import Detaille from './components/Book/BookDetails';
import UserList from './components/User/UserList';
import EditBook from './components/others/EditBook';
import AddBookForm from './components/Book/AddBookForm'; // Importer le composant AddBookForm

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
          <Route path="/books/:id" element={<Detaille />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/add-book" element={<AddBookForm />} /> // Ajouter la route pour le formulaire d'ajout de livre
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
