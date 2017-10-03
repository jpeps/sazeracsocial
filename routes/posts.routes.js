var express = require('express')
var router  = express.Router()

// CONTROLLERS
var postsController = require('../controllers/posts.controller.js')

// MIDDLEWARE
var authMiddleware = require('../middleware/authMiddleware')

// POST ROUTES ( /posts )
router
  .route('/')
    .get(postsController.postsGetAll)
    .post(authMiddleware.isLoggedIn, postsController.postsAddOne)

router
  .route('/new')
    .get(authMiddleware.authEditor, postsController.postsRenderNew)

router
  .route('/:postId')
    .get(postsController.postsGetById)
    .put(postsController.postsUpdateById)
    .delete(postsController.postsDeleteById)

module.exports = router
