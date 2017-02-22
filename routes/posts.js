var express = require('express')
var router  = express.Router()

// MODELS
var Post = require('../models/post')

// MIDDLEWARE
var globalMiddleware = require('../middleware')
var postsMiddleware  = require('../middleware/postsMiddleware')

// POST ROUTES

router
  .route('/posts')
  .get(ctrlHotels.postsGetAll)
  .post(ctrlHotels.postsAddOne)

router
  .route('/posts/:postId')
  .get(ctrlHotels.postsGetById)
  .put(ctrlHotels.postsUpdateById)
  .delete(ctrlHotels.postsDeleteById)

module.exports = router
