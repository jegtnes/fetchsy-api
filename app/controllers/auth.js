var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new basicStrategy(
  function(email, password, callback) {
    User.findOne({ email: email }, function(err, user) {
      if(err) {
        console.log('error: find user');
        return callback(err);
      }

      if (!user) {
        console.log('error: no user');
        return callback(null, false)
      }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) {
          console.log('error: verify password');
          return callback(err);
        }

        if (!isMatch) {
          console.log('error: passwords don\'t match');
          return callback(null,  false);
        }

        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
