const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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

module.exports = router;
