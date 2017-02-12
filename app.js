var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))

// Public Dir
app.use(express.static(__dirname + '/public'))

// Express Configs
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('landing')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
