var chai = require('chai');
var expect = require('chai').expect;
chai.use(require('chai-things'));

var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../../app/config');
var fixtures = require('../../fixtures/fixtures');

var apiSuffix = conf.get('apiSuffix') + "shops";
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../../app');
app.use(bodyParser.urlencoded({
  extended: true
}));

describe('Feed', function() {
  describe('show feed', function() {
    it('should show a single feed with items', function(done) {
      var fixtureId = fixtures.Subscription.sub5.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should show a single feed with no items', function(done) {
      var fixtureId = fixtures.Subscription.sub6.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(204);
          done();
        });
    });
  });
});
