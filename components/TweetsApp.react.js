/** @jsx React.DOM */

var React = require('react');
var Tweets = require('./Tweets.react.js');
var Loader = require('./Loader.react.js');
var NotificationBar = require('./NotificationBar.react.js');

// Export the TweetsApp component
module.exports = TweetsApp = React.createClass({

  // Method to add tweet to timeline
  addTweet: function(tweet){

    // get current application state
    var updated = this.state.tweets;

    // Increment the unread count
    var count = this.state.count + 1;

    // Increment the skip count
    var skip = this.state.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(tweet);

    // Set application state
    this.setState({tweets: updated, count: count, skip: skip});
  },

  // Method to get JSON from server by page
  getPage: function(page){

    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this;
    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = function() {

      // If everything is working...
      if (request.status >= 200 && request.status < 400){

        // load our next page
        self.loadPagedTweets(JSON.parse(request.responseText));

      } else {

        // Set application state (not paging, paging complete)
        self.setState({paging: false, done: true});
      }
    };

    // Fire!
    request.send()
  }

  // Method to show the unread tweets
    showNewTweets: function(){

      // Get current application state
      var updated = this.state.tweets;

      // Mark our tweets active
      updated.forEach(function(tweet){
        tweet.active = true;
      });

      // Set application state (active tweets + reset unread count)
      this.setState({tweets: updated, count: 0});

    },


// Method to load tweets fetched from the server
loadPagedTweets: function(tweets){


  var self = this;

  // If there are still tweets...
  if(tweets.length > 0) {

    // Get current application state
    var updated = this.state.tweets;

    // Push them onto the end of the current tweets array
    tweets.forEach(function(tweet){
      updated.push(tweet);
    });

    setTimeout(function(){

      // Set application state (Not paging, add tweets)
      self.setState({tweets: updated, paging: false});

    }, 1000);

  } else {

    // Set application state (Not paging, paging complete)
    this.setState({done: true, paging: false});

  }
},



  // Render the component

  render: function(){

    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
      </div>
    )

  }
});
