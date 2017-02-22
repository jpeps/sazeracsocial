var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  post_title: String,
  main_image: String,
  post_body: String,
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
