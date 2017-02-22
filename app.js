var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))

// Public Dir
app.use(express.static(__dirname + '/public'))
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js',  express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome'))

// Express Configs
app.set('view engine', 'ejs')

// Routes
var post_routes = require('./routes/posts')
var user_routes = require('./routes/users')
var comment_routes = require('./routes/comments')

app.use('/api', routes)
app.use('/got', got_routes)

app.get('/', function(req, res) {
  res.render('temp_static_pages/landingtest')
})

app.get('/about', function(req, res) {
  res.render('temp_static_pages/about')
})

app.get('/contact', function(req, res) {
  res.render('temp_static_pages/contact')
})

app.get('/post', function(req, res) {
  res.render('temp_static_pages/post')
})

// Admin routes

app.get('/admin', function(req, res) {
  res.render('temp_static_pages/admin')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
