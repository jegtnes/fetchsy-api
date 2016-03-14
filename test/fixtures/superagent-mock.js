var fs = require('fs');
var xml2js = require('xml2js').parseString;

var env = require('../../app/env');
var conf = require('../../app/config');

module.exports = [{
  pattern: conf.get('etsyBaseURI') + '(.*)/rss',
  fixtures: function(match, params, headers) {
    if (match[1] === 'MockNonexistentShop') {
      var file = fs.readFileSync(__dirname + '/etsyNonexistentShop.html', 'utf8');
      return file;
    }

    if (match[1] === 'MockEmptyShop') {
      var file = fs.readFileSync(__dirname + '/etsyEmptyShop.xml', 'utf8');
      return file;
    }

    if (match[1] === 'MockSingleShop') {
      var file = fs.readFileSync(__dirname + '/etsySingleShop.xml', 'utf8');
      return file;
    }

    if (match[1] === 'MockFullShop') {
      var file = fs.readFileSync(__dirname + '/etsyFullShop.xml', 'utf8');
      return file;
    }
  },

  get: function (match, data) {

    var returnObject = {
      xmlErr: false,
      body: false,
      code: 200,
    }

    xml2js(data, function(err, result) {
      if (err) {
        returnObject.xmlErr = err;
        returnObject.statusCode = 404;
        returnObject.body = {'message': "This shop's feed can't be found. It may be deleted or there might be a temporary glitch with Etsy's RSS feeds. Please check back later!"};
      }
      else {
        returnObject.body = result;
      }
    });

    return returnObject;
  },
}]
