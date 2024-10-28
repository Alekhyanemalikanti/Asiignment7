const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');  // For serving front-end files

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve front-end HTML files (static content)
app.use(express.static(path.join(__dirname, '../')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
