require('./data/db.js')

var express               = require('express'),
    app                   = express(),
    expressSession        = require('express-session'),
    passport              = require('passport'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser            = require('body-parser'),
    expressValidator      = require('express-validator')

app.set('port', (process.env.PORT || 3000))

// Public Dir
app.use(        express.static(__dirname + '/public'))
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js',  express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/fa',  express.static(__dirname + '/node_modules/font-awesome'))

// Express Configs
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

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

app.use(function (req, res, next) {
  res.locals.errors = null
  res.locals.currentUser = req.user
  next()
})

// Routes
var register_routes = require('./routes/register.routes')
var login_routes    = require('./routes/login.routes')
var post_routes     = require('./routes/posts.routes')
var user_routes     = require('./routes/users.routes')
var secret_routes   = require('./routes/superSecret.routes')

app.use('/register', register_routes)
app.use('/login',    login_routes)
app.use('/posts',    post_routes)
app.use('/users',    user_routes)
app.use('/secret',   secret_routes)

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

// ---------- TEMP ROUTING ---------- //

app.get('/', function(req, res) {
    res.render('static_pages/landing')
})

// ---------- TEMP ROUTING ---------- //

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
})
