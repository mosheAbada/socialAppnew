const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

require('dotenv').config(); // Load environment variables from .env file
const port = 3001 || 5000;

app.use(express.json());
app.use(cors());

app.use('/', authRoutes);

mongoose
  .connect(
    'mongodb+srv://foodisgood:ma123456@cluster0.pvfjbjr.mongodb.net/',
    {}
  )
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
