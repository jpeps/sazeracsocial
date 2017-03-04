var express = require('express')
var router  = express.Router()

// CONTROLLERS
var postsController = require('../controllers/posts.controller.js')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
// var postsMiddleware  = require('../middleware/postsMiddleware')

// POST ROUTES
router
  .route('/')
    .get(globalMiddleware.test, postsController.postsGetAll)
    .post(globalMiddleware.testTwo, postsController.postsAddOne)

router
  .route('/:postId')
    .get(postsController.postsGetById)
    .put(postsController.postsUpdateById)
    .delete(postsController.postsDeleteById)

module.exports = router
