var expect = require('chai').expect;
var request = require('supertest');

var conf = require('../../app/config');
conf.set('port', conf.get('port') + 1);

var apiSuffix = conf.get('apiSuffix') + "users";
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../app');

describe('User routes', function() {
  describe('signup', function() {
    it('should list users', function(done) {
      request(app)
        .get(apiSuffix)
        .set(authHeader)
        .expect(200)
        .end(function(err, res) {
          expect(err).to.equal(null);
          done();
        })
    });
  });
});
