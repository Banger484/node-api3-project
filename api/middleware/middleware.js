const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const currentDateTime = new Date();
  const formattedDate =
    currentDateTime.getFullYear() +
    "-" +
    (currentDateTime.getMonth() + 1) +
    "-" +
    currentDateTime.getDate() +
    "-" +
    currentDateTime.getHours() +
    ":" +
    currentDateTime.getMinutes() +
    ":" +
    currentDateTime.getSeconds()

  const method = req.method
  const url = req.url
  const status = res.statusCode

  const log = `[${formattedDate}] ${method}:${url} ${status}`
  console.log(log)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}