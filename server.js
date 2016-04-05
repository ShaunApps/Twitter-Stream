// Require our dependenecies

var express = require('express'),
  exphs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('ntwitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHanlder = require('./utils/streamHandler');

// created express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// set handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', handlebars);

// disable etag headers on responses
app.disable('etag');

// connect to mongo db
// issue in connecting to mongo
mongoose.connect('mongodb://local-host/twitter-stream');

// create an ntwitter instance
var twit = new twitter(config.twitter);

// Index route
app.get('/', routes.index);

// Page route
app.get('/page/:page/:skip', routes.page);

// Set /public as static content dir
app.use("/", express.static(__dirname + "/public/"));

// Start server
var server = http.createServer(app).listen(port, function() {
  console.log("server listening on port " + port);
});

// initialize socket.io
var io = require('socket.io').listen(server);

// set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'scotch_io, #scothio'}, function(stream){
  streamHandler(stream,io);
});
