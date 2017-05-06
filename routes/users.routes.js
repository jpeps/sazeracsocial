var express = require('express')
var router  = express.Router()

// CONTROLLERS
var postsController = require('../controllers/posts.controller.js')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
var authMiddleware   = require('../middleware/authMiddleware')

// POST ROUTES
router
  .route('/')
    .get(globalMiddleware.test, postsController.postsGetAll)
    .post(authMiddleware.isLoggedIn, postsController.postsAddOne)

module.exports = router
