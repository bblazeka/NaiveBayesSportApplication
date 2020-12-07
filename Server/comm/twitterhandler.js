const Twitter = require('twitter');
const twitterKeys = require('../keys/twitter.json');

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token,
  access_token_secret: twitterKeys.access_token_secret
});

async function getTweets(accountScreenName) {
  var params = { screen_name: accountScreenName };
  res = await client.get('statuses/user_timeline', params);
  return(res);
}

async function searchTweets(q, count, lang, result_type) {
  var params = { q, count, lang, result_type };
  res = await client.get('search/tweets', params);
  return(res);
}

module.exports = {
  getTweets,
  searchTweets,
}