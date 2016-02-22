var conf    = require('./config');
var urljoin = require('url-join');

var env = {};

var rootURL = conf.get('rootURL');
var apiSuffix = conf.get('apiSuffix');

var port = conf.get('port');
if (port !== 80) {
  rootURL = rootURL + ":" + port;
}
rootURL += '/';

env.rootURL = rootURL;
env.apiSuffix = apiSuffix;
env.apiURL = urljoin(rootURL + env.apiSuffix);

module.exports = env;
