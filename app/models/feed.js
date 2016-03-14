var request = require('superagent');
var xmlParser = require('superagent-xml2jsparser');
var moment = require('moment');

var getFeed = function(feedURI, options, callback) {
  request
    .get(feedURI)
    .accept('xml')
    .parse(xmlParser)
    .end(function(err, res) {
      if (err) {
        callback({
          message: 'Error in processing Etsy response',
          errorCode: 404,
          errors: [err]
        });
      }

      else {
        var items = res.body.rss.channel[0].item ? res.body.rss.channel[0].item : [];

        if (options.since) {
          items = _filterFeedByTimestamp(items, options.since);
        }

        callback(null, items);
      }
    });
}

// @TODO: Unit test this pls
var etsyTimeToTimestamp = function(timestamp) {
  return moment(timestamp, 'ddd, DD MMM YYYY HH:mm:ss ZZ').valueOf();
}

var _filterFeedByTimestamp = function(feed, timestamp) {
  return feed.filter(function(item) {
    var feedTimestamp = etsyTimeToTimestamp(item.pubDate);
    return feedTimestamp > timestamp;
  });
}

module.exports.etsyTimeToTimestamp = etsyTimeToTimestamp;
module.exports.getFeed = getFeed;
