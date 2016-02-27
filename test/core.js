var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var fixtures = require('pow-mongoose-fixtures');

var conf = require('../app/config');

before(function(done) {
  mockgoose(mongoose);
  done();
});

beforeEach(function(done) {
  fixtures.load({
    User: [
      {
        email: 'test1@test.com',
        password: 'testytest'
      },
      {
        email: 'test2@test.com',
        password: 'testytest'
      }
    ]
  }, mongoose.connection);
  done();
});

afterEach(function(done) {
  mockgoose.reset(function() {
    done();
  });
});
