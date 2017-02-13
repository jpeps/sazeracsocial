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

app.get('/', function(req, res) {
  res.render('temp_static_pages/landingtest')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
