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
                currentUser: user
              });
            }
          );
        });
      });
    });
  });
});

// @route   GET api/users/:id
// @desc    Get user data
// @access  Public
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .select('-username -password')
    .then(user => res.json(user));
});

// @route   GET api/users
// @desc    Search for users
// @access  Public
router.get('/', (req, res) => {
  // Query for users
  User.aggregate(
    [
      {
        $project: {
          _id: 1,
          profile: 1,
          fullName: {
            $cond: {
              if: { $eq: ['', '$profile.lastName'] },
              then: '$profile.firstName',
              else: {
                $concat: ['$profile.firstName', ' ', '$profile.lastName']
              }
            }
          }
        }
      },
      {
        $match: {
          fullName: new RegExp(req.param('searchInput'), 'i')
        }
      }
    ],
    function(err, users) {
      res.json(users);
    }
  );
});

module.exports = router;
