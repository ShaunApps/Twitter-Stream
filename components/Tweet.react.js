/** @jsx React.DOM */

var React = require('react');

module.exports = Tweet = React.createClass({
  render: function(){
    var tweet = this.props.tweets;
    return (
      <li className={"tweet" + (tweet.active ? ' active' : '')}>
        <img src={tweet.avatar} className="avatar"/>
        <blockquote>
    )
  }
})
