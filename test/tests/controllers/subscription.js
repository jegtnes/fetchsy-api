var chai = require('chai');
var expect = require('chai').expect;
chai.use(require('chai-things'));

var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../../app/config');
var fixtures = require('../../fixtures/fixtures');

var apiSuffix = conf.get('apiSuffix') + "subscriptions";
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
          expect(res.body).to.all.have.property('userId');
          expect(res.body).to.all.have.property('shopName');
          done();
        });
    });
  });

  describe('show single subscription', function() {
    it('should show a single subscription', function(done) {
      var fixtureId = fixtures.Subscription.sub3._id;
      request(app)
        .get(apiSuffix + '/' + fixtureId)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.shopName).to.equal('CoolKidzSkateboardz');
          done();
        });
    });
  });

  describe('create subscription', function() {
    it('should create a subscription', function(done) {

      var subscription = {
        shopName: "Artisanal Artisans",
        frequency: 30,
        userId: "cantbebotheredgeneratingamongodbuserid"
      };

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(subscription)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(201);
          expect(res.get('Location')).to.exist;
          expect(res.body).to.be.empty;
          done();
        });
    });

    it('should not create a duplicate subscription', function(done) {
      var subscription = {};
      var duplicateFixture = fixtures.Subscription.sub1;

      subscription.shopName = duplicateFixture.shopName;
      subscription.frequency = duplicateFixture.frequency;
      subscription.userId = duplicateFixture.userId;

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(subscription)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(422);
          expect(res.body.message).to.exist;
          done();
        })
    });
  });

  describe('update subscription', function() {
    it('should update an existing subscription', function(done) {

      var fixtureId = fixtures.Subscription.sub3._id;

      var subscription = {
        frequency: 120,
        shopName: 'Artisanal Goat Herding Supplies'
      };

      request(app)
        .put(apiSuffix + '/' + fixtureId)
        .set(authHeader)
        .type('form')
        .send(subscription)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body.frequency).to.equal(120);
          expect(res.body.shopName).to.equal('Artisanal Goat Herding Supplies');
          done();
        });
    });
  });

  describe('delete subscription', function() {
    it('should delete an existing subscription', function(done) {

      var fixtureId = fixtures.Subscription.sub3._id;

      request(app)
        .delete(apiSuffix + '/' + fixtureId)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});
