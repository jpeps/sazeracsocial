var express = require('express')
var router  = express.Router()

// CONTROLLERS
var usersController = require('../controllers/users.controller.js')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
var authMiddleware   = require('../middleware/authMiddleware')

// POST ROUTES
router
  .route('/')
    .get(usersController.userLogin)
    .post(authMiddleware.isLoggedIn, usersController.userLoginAuth)

module.exports = router
