const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');








//UPDATE LOAN//
const updateLoan = async (req, res) => {
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
        res.status(500).json({ error: 'An error occurred while updating the loan.' });
    }
};


// GET LOANS // 
const getAllLoan = async (req, res) => {
    try {
        console.log("User role:", req.userRole); // For debugging
        console.log("APPPPPAA")
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
};




//ADD LOAN//
const addLoan = async (req, res) => {
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

        // Check if the book is available
        if (!book.available) {
            return res.status(400).json({ success: false, message: 'Book is currently not available for loan' });
        }

        // Create a new loan
        const newLoan = await Loan.create({ userId, bookId, loanDate, returnDate });

        // Set the book as not available
        book.available = false;
        await book.save();

        res.status(201).json({ success: true, message: 'Loan added successfully', loan: newLoan });
    } catch (error) {
        console.error('Error adding loan:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// GET A LOAN BY ID//
const getLoanId =  async (req, res) => {
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
  };


//DeLETE LOAN //
const deleteLoan = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the loan by ID
      const loan = await Loan.findByPk(id);
      if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
  
      // Find the book by ID
      const book = await Book.findByPk(loan.bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Delete the loan
      await loan.destroy();
  
      // Set the book as available
      book.available = true;
      await book.save();
  
      res.status(200).json({ message: 'Loan deleted and book set to available successfully' });
    } catch (error) {
      console.error('Error deleting loan:', error);
      res.status(500).json({ error: 'An error occurred while deleting the loan.' });
    }
  };

//LOAN CCOUNT//
const countLoan = async (req, res) => {
    try {
      console.log("APPPPPAA")
      const loansCount = await Loan.count();
      res.status(200).json({ loansCount });
    } catch (error) {
      console.error('Error fetching loans count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the loans count.' });
    }
  };








  module.exports = {
    updateLoan,
    getAllLoan,
    addLoan,
    getLoanId,
    deleteLoan,
    countLoan,
  };