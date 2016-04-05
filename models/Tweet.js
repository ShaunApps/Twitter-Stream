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

// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback) {

  var tweets = [];
      start = (page * 10) + (skip * 1);

  // query the db, using skip and limit to achieve page chunks
  Tweet.find({}, 'twid active author avatar body date screename',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err, docs){

    // if everything is ok...
    if(!err) {
      tweets = docs; // have tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // set them to active
      });
    }

    // pass them back to the specified callback
    callback(tweets);

  });
};

// Return a tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);
