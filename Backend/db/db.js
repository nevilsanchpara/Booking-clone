const mongoose = require('mongoose');

const url = 'mongodb+srv://nevilsaspara:nevil15@cluster0.v8u11ij.mongodb.net/';

const connectToDatabase = async() => {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
  };

  module.exports = {connectToDatabase };
