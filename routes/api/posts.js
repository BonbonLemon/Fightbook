const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post Model
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, (req, res) => {
  const { postedBy, postedTo, body } = req.body;

  const newPost = new Post({
    postedBy,
    postedTo,
    body
  });

  newPost.save().then(post => {
    res.json(post);
  });
});

// @route   GET api/items
// @desc    Get all Items
// @access  Public
router.get('/:userId', (req, res) => {
  Post.find({ postedTo: req.params.userId })
    .sort({ dateCreated: -1 })
    .then(posts => {
      res.json(posts);
    });
});

module.exports = router;
