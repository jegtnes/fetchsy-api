var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var superagent = require('superagent');

var conf = require('../../app/config');
var fixtures = require('pow-mongoose-fixtures');
var superagentMockConfig = require('../fixtures/superagent-mock');


before(function(done) {
  var superagentMock = require('superagent-mock')(superagent, superagentMockConfig);
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
