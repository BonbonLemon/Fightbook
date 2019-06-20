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
    post.populate('postedBy', function(err) {
      res.json(post);
    });
  });
});

// @route   GET api/posts/:userId
// @desc    Get posts for a user
// @access  Public
router.get('/:userId', (req, res) => {
  Post.find({ postedTo: req.params.userId })
    .populate('postedBy')
    .sort({ dateCreated: -1 })
    .exec((err, posts) => {
      res.json(posts);
    });
});

module.exports = router;
