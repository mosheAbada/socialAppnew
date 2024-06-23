const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
const PORT = 3001 || 5000;

app.use(express.json());
app.use(cors());

app.use('/', authRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017/socialapp')
  .then(() => {
    app.listen(PORT, () => {
      console.log('server listening on port', PORT);
    });
  })
  .catch((err) => {
    console.log('error', err);
  });
