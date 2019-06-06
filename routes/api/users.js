const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  debugger;
  const { firstName, lastName, nickname, username, password } = req.body;

  // Simple validation
  if (!firstName || !username || !password) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  // Check for existing user
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: 'Username already taken' });

    const newUser = new User({
      username,
      password,
      profile: {
        firstName,
        lastName,
        nickname
      }
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  profile: user.profile
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;