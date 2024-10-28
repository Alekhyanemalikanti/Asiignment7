const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST signup
router.post('/', async (req, res) => {
  const { fullname, email, username, password, confirm_password } = req.body;
  
  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const user = new User({ fullname, email, username, password });
    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    // Send the token to the client
    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    res.status(400).send('Error signing up');
  }
});

module.exports = router;
