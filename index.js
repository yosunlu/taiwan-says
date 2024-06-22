const express = require('express');
const mongoose = require('mongoose');
const entryRoute = require('./routes/entry.route.js');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

// middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Correct middleware config

// routes
app.use('/api/entries', entryRoute)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(PORT)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Connection failed:', error));

