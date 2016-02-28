var expect = require('chai').expect;
var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../../app/config');
var fixtures = require('../../fixtures/fixtures');

var apiSuffix = conf.get('apiSuffix') + "subscriptions";
console.log(apiSuffix);
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../../app');
app.use(bodyParser.urlencoded({
  extended: true
}));

// @TODO: Tests for 404s. Tests for bad data

describe('Subscription routes', function() {
  describe('show subscriptions', function() {
    it('should show all subscriptions', function(done) {
      request(app)
        .get(apiSuffix)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          expect(res.body[0].shopName).to.equal('UnicornFluff');
          done();
        });
    });
  });
});
