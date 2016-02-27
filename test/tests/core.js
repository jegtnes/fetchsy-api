var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var fixtures = require('pow-mongoose-fixtures');
var conf = require('../../app/config');

before(function(done) {
  mockgoose(mongoose);
  done();
});

beforeEach(function(done) {
  fixtures.load('../fixtures/fixtures.js', mongoose.connection);
  done();
});

afterEach(function(done) {
  mockgoose.reset(function() {
    done();
  });
});
