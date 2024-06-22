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

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Connection failed:', error));

