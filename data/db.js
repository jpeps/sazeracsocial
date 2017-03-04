var mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost/sazeracsocial'

mongoose.connect(dbUrl)

mongoose.connection.on('connected', function() {
  console.log('Connected to database:', dbUrl)
})

mongoose.connection.on('disconnected', function() {
  console.log('Disconnected from database:', dbUrl)
})

mongoose.connection.on('error', function(error) {
  console.log('Mongoose connection error: ' + error)
})

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnection via app termination: (SIGINT)')
    process.exit(0)
  })
})

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnection via app termination: (SIGTERM)')
    process.exit(0)
  })
})

// MODELS AND SCHEMAS
require('../models/comment.model')
require('../models/post.model')
require('../models/user.model')
