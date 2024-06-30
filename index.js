const express = require('express');
const mongoose = require('mongoose');
const entryRoute = require('./routes/entry.route.js');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

// middleware
const corsOptions = {
  origin: 'https://yosunlu.github.io', // Allow requests from this origin
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions)); // Enable CORS with specific options
app.use(express.json()); // Correct middleware config

// routes
app.use('/api/entries', entryRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Connection failed:', error));

