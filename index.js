let bodyParser = require('body-parser')
let multer = require('multer')
let http = require('http')
let express = require('express')

const app = new express()

app.set('port', process.env.PORT || 7070)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

require('./app.js')(app)

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
})
