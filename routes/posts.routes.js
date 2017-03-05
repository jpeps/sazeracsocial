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

router
  .route('/new')
    .get(authMiddleware.isLoggedIn, postsController.postsRenderNew)

router
  .route('/:postId')
    .get(postsController.postsGetById)
    .put(postsController.postsUpdateById)
    .delete(postsController.postsDeleteById)

module.exports = router
