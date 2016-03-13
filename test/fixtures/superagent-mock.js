var fs = require('fs');
var xml2js = require('xml2js').parseString;

var env = require('../../app/env');
var conf = require('../../app/config');

module.exports = [{
  pattern: conf.get('etsyBaseURI') + '(.*)/rss',
  fixtures: function(match, params, headers) {
    if (match[1] === 'MockFullShop') {
      var file = fs.readFileSync(__dirname + '/etsyFullShop.xml', 'utf8');
      return file;
    }

    if (match[1] === 'MockEmptyShop') {
      var file = fs.readFileSync(__dirname + '/etsyEmptyShop.xml', 'utf8');
      return file;
    }
  },

  get: function (match, data) {
    var json = false;
    xml2js(data, function(err, result) {
      json = result;
    });

    return {
      match: match,
      body: json,
      code: 200
    };
  },
}]
