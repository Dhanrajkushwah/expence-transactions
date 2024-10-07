// user.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Expense = require('../models/Expense.model');
const secretKey = 'supersecretkey'; 
// Get all users
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Create user
const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return res.status(401).json({ message: 'Password is incorrect' });

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ userId: user.id, token, tokenExpiration: 1 });
};

// Get all transactions (income & expense)
const getTransactions = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Add a new transaction
// Add a new transaction
// Add a new transaction
const addTransaction = async (req, res) => {
    const { title, type, amount, category, description, date, references } = req.body;
    try {
      const newExpense = new Expense({
        title,  // Include title
        type,
        amount,
        category,
        description,
        date,
        references // Include references
      });
      await newExpense.save();
      res.json(newExpense);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Delete a transaction
  const deleteTransaction = async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.json({ message: 'Transaction deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.getTransactions = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get only Income transactions
  const getIncomes = async (req, res) => {
    try {
      const incomes = await Expense.find({ type: 'income' });
      res.json(incomes);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get only Expense transactions
  const getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find({ type: 'expense' });
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

module.exports = {
    getUsers,
    createUser,
    loginUser,
    deleteTransaction,
    addTransaction,
    getTransactions,
    getExpenses,
    getIncomes
};
