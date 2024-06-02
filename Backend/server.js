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


//SIGN UP//
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

//LOGIN//
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

//UPDATE LOAN//
app.put('/api/loans/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { bookId, loanDate, returnDate } = req.body;

  try {
    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.bookId = bookId;
    loan.loanDate = loanDate;
    loan.returnDate = returnDate;

    await loan.save();

    res.status(200).json({ success: true, message: 'Loan updated successfully', loan });
  } catch (error) {
    console.error('Error updating loan:', error);
    res.status(500).json({ error: 'An error occurred while updating the loan.' });
  }
});

// GET BOOKS // 
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

//ADD LOAN//
app.post('/api/loans', async (req, res) => {
  const { userId, bookId, loanDate, returnDate } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Create a new loan
    const newLoan = await Loan.create({ userId, bookId, loanDate, returnDate });
    res.status(201).json({ success: true, message: 'Loan added successfully', loan: newLoan });
  } catch (error) {
    console.error('Error adding loan:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});



// GET A LOAN BY ID//
app.get('/api/loans/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findByPk(id, {
      include: [
        { model: User },
        { model: Book }     
      ]
    });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ error: 'An error occurred while fetching the loan.' });
  }
});
// GET A BOOK BY ID //
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

// UPDATE BOOK //
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

//GET USER BY ID //
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

// GET ALL BOOKS //
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books.' });
  }
});


// ADD BOOK //
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


// ADD BOOK //
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




// GET BOOKS //
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});


// DELETE BOOK //
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


//DELETE USER //
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


//BOOK COUNT //
app.get('/api/Bookcount', async (req, res) => {
  try {
    const bookCount = await Book.count();
    console.log('bookCount : ',bookCount)
    res.status(200).json({ bookCount });
  } catch (error) {
    console.error('Error fetching book count:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book count.' });
  }
});


//LOAN CCOUNT//
app.get('/api/loanscount', async (req, res) => {
  try {
    const loansCount = await Loan.count();
    res.status(200).json({ loansCount });
  } catch (error) {
    console.error('Error fetching loans count:', error);
    res.status(500).json({ error: 'An error occurred while fetching the loans count.' });
  }
});


//USER  COUNT//
app.get('/api/userscount', async (req, res) => {
  try {
    const usersCount = await User.count();
    res.status(200).json({ usersCount });
  } catch (error) {
    console.error('Error fetching users count:', error);
    res.status(500).json({ error: 'An error occurred while fetching the users count.' });
  }
});

app.use(express.static(path.join(__dirname, 'gestion-bibliotheque-client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/gestion-bibliotheque-client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
