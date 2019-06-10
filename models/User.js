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

UserSchema.virtual('fullName').get(function() {
  return this.profile.firstName + (' ' + this.profile.lastName) || '';
});

module.exports = User = mongoose.model('user', UserSchema);
