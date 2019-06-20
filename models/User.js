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
  const { firstName, lastName } = this.profile;

  let fullName = firstName;
  if (lastName) fullName += ' ' + lastName;

  return fullName;
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, user, opt) {
    delete user.password;
    return user;
  }
});

UserSchema.index({
  'profile.firstName': 'text',
  'profile.lastName': 'text'
});

module.exports = User = mongoose.model('User', UserSchema);
