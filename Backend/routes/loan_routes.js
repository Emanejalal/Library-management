const express = require('express')
const {updateLoan,getAllLoan,addLoan,getLoanId,deleteLoan,countLoan} = require('../controllers/loan_controllers');
const { verifyToken } = require('../auth');

const router = express.Router();

router.put('/api/loans/:id',updateLoan);
router.get('/api/loans',getAllLoan);
router.post('/api/loans',addLoan);
router.get('/api/loans/:id',getLoanId);
router.delete('/api/loans/:id',deleteLoan);
router.get('/api/loancount',countLoan);


module.exports = router;