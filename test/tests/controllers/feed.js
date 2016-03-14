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
var moment = require('moment');
app.use(bodyParser.urlencoded({
  extended: true
}));

describe('Feed', function() {
  describe('show feed', function() {
    it('should warn when a shop no longer exists', function(done) {
      var fixtureId = fixtures.Subscription.sub5.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .set(authHeader)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(404);
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

    it('should show a single feed with one item', function(done) {
      var fixtureId = fixtures.Subscription.sub7.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should show a single feed with multiple items', function(done) {
      var fixtureId = fixtures.Subscription.sub8.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.not.be.empty;
          expect(res.body.length).to.equal(6);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should show only some items if a "since" filter has been applied', function(done) {
      var fixtureId = fixtures.Subscription.sub5.shopName;
      var timestamp = moment('Sat, 12 Mar 2016 13:26:34 -0500', 'ddd, DD MMM YYYY HH:mm:ss ZZ').valueOf();

      request(app)
        .get(apiSuffix + '/' + fixtureId + '/feed')
        .query({since: timestamp})
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
});
