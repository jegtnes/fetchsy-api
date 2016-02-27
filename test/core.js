var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var fixtures = require('pow-mongoose-fixtures');

var conf = require('../app/config');

before(function(done) {
  mockgoose(mongoose);
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

after(function(done) {
  mockgoose.reset(function() {
    mockgoose.reset();
    mongoose.connection.close();
    done();
  });
});
