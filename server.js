// Require our dependenecies

var express = require('express'),
  exphs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('ntwitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHanlder = require('./utils/streamHandler');

//created express instance and set a port variable 
var app = express();
var port = process.env.PORT || 808;
