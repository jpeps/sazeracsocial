require('./data/db.js')

var express               = require('express'),
    app                   = express(),
    expressSession        = require('express-session'),
    passport              = require('passport'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser            = require('body-parser')

app.set('port', (process.env.PORT || 3000))

// Public Dir
app.use(express.static(__dirname + '/public'))
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js',  express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome'))

// Express Configs
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// ------------- TEMP SHIT ------------- //
var User = require('./models/user.model')
// ------------- TEMP SHIT ------------- //

//Passport Config
app.use(expressSession(({
  secret: 'boobookittyduck',
  resave: false,
  saveUninitialized: false
})))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routes
var register_routes = require('./routes/register.routes')
var login_routes = require('./routes/login.routes')
var post_routes = require('./routes/posts.routes')
var user_routes = require('./routes/users.routes')

app.use('/register', register_routes)
app.use('/login', login_routes)
app.use('/posts', post_routes)
app.use('/users', user_routes)

// ---------- TEMP ROUTING ---------- //

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

// ---------- TEMP ROUTING ---------- //

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
