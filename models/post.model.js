var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  post_title: {
    type: String,
    required: true
  },

  main_image: {
    type: String,
    required: true
  },

  post_body: {
    type: String,
    required: true
  },

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

module.exports = mongoose.model('Post', postSchema)
