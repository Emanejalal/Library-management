// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { generateToken, verifyToken } = require('./auth');
const sequelize = require('./sequelize');
const User = require('./models/User');
const Book = require('./models/Book');
const Loan = require('./models/Loan');

const app = express();
const PORT = process.env.PORT || 8082;

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database:', err);
  });

app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  console.log('Signup request received:', { email, role });

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, role: role || 'user' });

    console.log('New user created:', newUser);
    res.status(201).json({ success: true, message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login request received:', { email, password }); // For debugging
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('Retrieved user from database:', user.password); // For debugging
    
    if (!password) {
      console.log('Password not provided');
      return res.status(400).json({ success: false, message: 'Password not provided' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch); // For debugging
    
    if (!passwordMatch) {
      console.log('Incorrect password for user:', email);
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = generateToken({ id: user.id, role: user.role });
    console.log('User logged in successfully:', email); // For debugging
    res.status(200).json({ success: true, token, role: user.role }); // Include the role in the response
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});


// GET a book by ID
app.get('/api/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book.' });
  }
});

// PUT update a book by ID
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, description } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.year = year;
    book.description = description;

    await book.save();

    res.status(200).json({ success: true, message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'An error occurred while updating the book.' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching the users.' });
  }
});

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books.' });
  }
});

// server.js

app.post('/api/books', async (req, res) => {
  const { title, author, genre, year } = req.body;

  try {
    const newBook = await Book.create({ title, author, genre, year });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'An error occurred while adding the book.' });
  }
});


// server.js

app.post('/api/books', async (req, res) => {
  const { title, author, genre, year } = req.body;

  try {
    const newBook = await Book.create({ title, author, genre, year });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'An error occurred while adding the book.' });
  }
});


// Backend API route to fetch loans
app.get('/api/loans', verifyToken, async (req, res) => {
  try {
    console.log("User role:", req.userRole); // For debugging

    // Define the query condition
    let queryCondition = {};
    if (req.userRole !== 'admin') {
      queryCondition.userId = req.userId; // Regular users can only see their own loans
    }

    // Fetch loans based on the condition
    const loans = await Loan.findAll({
      where: queryCondition,
      include: [
        { model: User },
        { model: Book }
      ]
    });

    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ error: 'An error occurred while fetching loans.' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});


app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'An error occurred while deleting the book.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

app.use(express.static(path.join(__dirname, 'gestion-bibliotheque-client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/gestion-bibliotheque-client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
