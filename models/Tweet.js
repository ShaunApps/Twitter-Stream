var mongoose = require('mongoose');

// create a new schema for out tweet data
var schema = new mongoose.Schema({
  twid          : String
, active        : Boolean
, author        : String
, avatar        : String
, body          : String
, date          : Date
, screename     : String
});
