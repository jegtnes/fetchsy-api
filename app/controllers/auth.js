var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

var config = require('../config');

passport.use(new Strategy(
  function(token, callback) {
    if (config.get('apiKey') !== token) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
  }
));

exports.isAuthenticated = passport.authenticate('bearer', { session: false });
