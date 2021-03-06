var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(email) {
        return validator.isEmail(email)
      },
      message: "This email address({VALUE}) is invalid. Please correct it and try again!"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Your password must be at least 8 characters. Soz!']
  },
});

UserSchema.plugin(uniqueValidator, {
  message: 'This email ({VALUE}) has already been registered. Please try another!'
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
