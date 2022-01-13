const express = require('express');

const userRouter = require('./users/users-router')
const { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost,
} = require('./middleware/middleware')
// global middlewares and the user's router need to be connected here

const server = express();
// remember express by default cannot parse JSON in request bodies

server.use(express.json())

server.use('/api/users', userRouter)





server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
