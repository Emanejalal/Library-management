const express = require('express')
const {getBookId,updateBook,getAllBook,addBook,deleteBook,countBook} = require('../controllers/book_controllers')



const router = express.Router();


router.get('/api/books/:id',getBookId);
router.put('/api/books/:id',updateBook);
router.get('/api/books',getAllBook);
router.post('/api/books',addBook);
router.delete('/api/books/:id',deleteBook);
router.get('/api/Bookcount',countBook);


module.exports = router;