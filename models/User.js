const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileDetails: {
    avatar: String, // Optional
    hobbies: [String], // Optional
    bio: String, // Optional
    interests: [String], // Optional
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
