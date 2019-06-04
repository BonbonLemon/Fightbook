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
  register_date: {
    type: Date,
    default: Date.now
  },
  profile: {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String
    },
    nickname: {
      type: String
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
