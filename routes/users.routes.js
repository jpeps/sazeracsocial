var express = require('express')
var router  = express.Router()

// CONTROLLERS
var postsController = require('../controllers/posts.controller.js')

// MIDDLEWARE
var authMiddleware = require('../middleware/authMiddleware')

// POST ROUTES ( /users ) -- Clearly not done
router
  .route('/')
    .get(postsController.postsGetAll)
    .post(authMiddleware.isLoggedIn, postsController.postsAddOne)

module.exports = router
