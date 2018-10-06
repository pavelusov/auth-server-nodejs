// User model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true, // Unique value support
    lowercase: true // Save lower case value
  },
  password: String
});

// Create User class
const User = mongoose.model('user', userSchema);

module.exports = User;
