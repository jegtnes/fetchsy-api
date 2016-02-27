var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

before(function(done) {
  var mongoose = require('mongoose');
  var mockgoose = require('mockgoose');
  mockgoose(mongoose);
  mongoose.connect('mongodb://localhost/fetchsy');
  done();
});

after(function(done) {
  mockgoose.reset();
  done();
});
