require('./data/db.js')

var express               = require('express'),
    app                   = express(),
    expressSession        = require('express-session'),
    MongoDBStore          = require('connect-mongodb-session')(expressSession),
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

// Session Stores
var store = new MongoDBStore({
    uri: 'mongodb://localhost/sazeracsocial',
    collection: 'sessions'
})

store.on('error', function(error) {
    assert.ifError(error)
    assert.ok(false)
})

//Passport Config
app.use(expressSession(({
    secret: 'boobookittyduck',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },  // 1 week
    store: store,
    resave: false,
    saveUninitialized: false
})))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Middleware vars
app.use(function (req, res, next) {
  res.locals.errors = null
  res.locals.currentUser = req.user
  next()
})

// Routes
var registerRoutes = require('./routes/register.routes')
var loginRoutes    = require('./routes/login.routes')
var postRoutes     = require('./routes/posts.routes')
var userRoutes     = require('./routes/users.routes')

app.use('/register', registerRoutes)
app.use('/login',    loginRoutes)
app.use('/posts',    postRoutes)
app.use('/users',    userRoutes)

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
