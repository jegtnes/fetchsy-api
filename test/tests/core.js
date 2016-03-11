var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var fixtures = require('pow-mongoose-fixtures');
var conf = require('../../app/config');

before(function(done) {
  mockgoose(mongoose);
  done();
});

beforeEach(function(done) {
  this.timeout(5000);
  fixtures.load('../fixtures/fixtures.js', mongoose.connection, function() {
    done();
  });
});

afterEach(function(done) {
  this.timeout(5000);
  mockgoose.reset(function() {
    done();
  });
});
