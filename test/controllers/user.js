var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var conf = require('../../app/config');
var apiSuffix = conf.get('apiSuffix') + "users";
conf.set('port', conf.get('port') + 1);

mockgoose(mongoose);

var app = require('../../app');

describe('User routes', function() {
  describe('signup', function() {
    it('should create a user', function(done) {
      request(app)
        .get(apiSuffix)
        .expect(200)
        .end(function(err, res) {
          expect(err).to.equal(null);
          console.log(res.body.user);
        })
    });
  });
});
