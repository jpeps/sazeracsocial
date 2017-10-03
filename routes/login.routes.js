var express = require('express')
var router  = express.Router()

// CONTROLLERS
var usersController = require('../controllers/users.controller.js')

// MIDDLEWARE
var authMiddleware   = require('../middleware/authMiddleware')

// POST ROUTES ( /login )
router
  .route('/')
    .get(usersController.userLogin)
    .post(usersController.loginUser)

module.exports = router
