const express = require('express');
const { 
    getUsers, 
    createUser, 
    loginUser, 
    getTransactions,
    addTransaction,
    deleteTransaction,
    getIncomes,
    getExpenses,


} = require('../controllers/user.controller');

const checkAuth = require('../middleware'); // Ensure this is the correct path
const router = express.Router();

// Example route
router.get('/protected', checkAuth, (req, res) => {
    res.json({ message: 'This is a protected route.', userId: req.userId });
});

// User routes
router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/login', loginUser);

//Expense
// Correct paths with leading slash
router.get('/transaction', getTransactions);
router.post('/addtransaction', addTransaction);
router.delete('/delete/:id', deleteTransaction);
router.get('/incomes', getIncomes);
router.get('/expenses', getExpenses);


module.exports = router;
