var express = require('express')
var router  = express.Router()

// CONTROLLERS
var secretsController = require('../controllers/secrets.controller.js')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
var authMiddleware   = require('../middleware/authMiddleware')

// ROUTES ( /secret )
router
  .route('/')
    .get(globalMiddleware.test, authMiddleware.isLoggedIn, secretsController.renderSecretPage)

module.exports = router
