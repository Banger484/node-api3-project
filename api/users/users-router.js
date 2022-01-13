const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res) => {
  User.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(400).json(err)
  })
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', logger, validateUserId, (req, res) => {
    // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
    User.update(req.params.id, { name: req.name})
      .then(updatedUser =>{
        res.json(updatedUser)
      })
      .catch(next)
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.post(
  '/:id/posts', 
  logger, 
  validateUserId,
  validatePost,
  async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.json(result)
  } catch (err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router;