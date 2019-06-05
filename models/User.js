const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  profile: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    nickname: {
      type: String
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
