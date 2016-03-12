var request = require('superagent');
var xmlParser = require('superagent-xml2jsparser');

var getFeed = function(feedURI, callback) {
  request
    .get(feedURI)
    .accept('xml')
    .parse(xmlParser)
    .end(function(err, res) {
      if (err) {
        callback(new Error({
          message: 'Error in processing Etsy response',
          errors: [err]
        }));
      }

      var items = res.body.rss.channel[0].item ? res.body.rss.channel[0].item : [];

      callback(null, items);
    });
}

module.exports.getFeed = getFeed;
