var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var conf = require('../app/config');

before(function(done) {
  mockgoose(mongoose);
  done();
});

after(function(done) {
  mockgoose.reset(function() {
    mockgoose.reset();
    mongoose.connection.close();
    done();
  });
});
