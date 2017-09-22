var express = require('express')
var router  = express.Router()

// CONTROLLERS
var usersController = require('../controllers/users.controller.js')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
var authMiddleware   = require('../middleware/authMiddleware')

// POST ROUTES ( /register )
router
  .route('/')
    .get(usersController.userRegister)
    .post(usersController.registerNewUser)

module.exports = router
