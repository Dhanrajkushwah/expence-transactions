const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes'); 
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Contas:nuouP4MyDhH0q3E4@cluster0.gkkofhc.mongodb.net/Expense';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Use user routes
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

// Start the server with Socket.IO and Express on the same port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
