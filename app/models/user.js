// @TODO: Return nicer duplicate error
// @TODO: Email validationn
// @TODO: Rudimentary password strength check

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});


UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) {
    return callback();
  }

  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return callback(err);
      }

      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isVerified) {
    if (err) {
      return cb(err);
    }

    cb(null, isVerified);
  });
}

module.exports = mongoose.model('User', UserSchema);