// backend/app.js
const express = require('express');
const path = require('path');
const auth = require('./middleware/auth'); // Import the auth middleware
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files like HTML, CSS, and images
app.use(express.static(path.join(__dirname, '../frontend'))); 

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);

// Protected route for homepage (or any route you want to protect)
app.get('/index.html', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Respond with your home page HTML file
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
