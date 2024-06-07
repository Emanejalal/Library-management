const Book = require('../models/Book')





// GET A BOOK BY ID //
const getBookId = async (req, res) => {
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
};

// UPDATE BOOK //
const updateBook = async (req, res) => {
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
};

// GET ALL BOOKS //
const getAllBook = async (req, res) => {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
  };



// ADD BOOK //
const addBook = async (req, res) => {
    const { title, author, genre, year } = req.body;
  
    try {
      const newBook = await Book.create({ title, author, genre, year });
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
  };


// DELETE BOOK //
const deleteBook = async (req, res) => {
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
  };

//BOOK COUNT //
const countBook = async (req, res) => {
    try {
      const bookCount = await Book.count();
      console.log('bookCount : ',bookCount)
      res.status(200).json({ bookCount });
    } catch (error) {
      console.error('Error fetching book count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the book count.' });
    }
  };


  module.exports = {
    addBook,
    getBookId,
    updateBook,
    getAllBook,
    deleteBook,
    countBook,

  };
  
  
