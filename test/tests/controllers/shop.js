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

// @TODO: Tests for 404s. Tests for bad data

describe('Shop', function() {
  describe('Show shops', function() {
    it('should show all shops', function(done) {
      request(app)
        .get(apiSuffix)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.all.have.property('shopName');
          expect(res.body).to.all.have.property('subscriptions');
          done();
        });
    });
  });

  describe('show single shop', function() {
    it('should show a single shop', function(done) {
      var fixtureId = fixtures.Subscription.sub4.shopName;
      request(app)
        .get(apiSuffix + '/' + fixtureId)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.shopName).to.exist;
          expect(res.body.subscriptions.length).to.equal(3);
          expect(res.body.subscriptions).to.all.have.property('userId');
          expect(res.body.subscriptions).to.all.have.property('frequency');
          expect(res.body.subscriptions).to.all.have.property('lastChecked');
          done();
        });
    });
  });

  describe('show single subscription', function() {
    it('should show a single subscription', function(done) {
      var shopName = fixtures.Subscription.sub4.shopName;
      var userId = fixtures.Subscription.sub4.subscriptions[0].userId;

      request(app)
        .get(apiSuffix + '/' + shopName + '/' + userId)
        .set(authHeader)
        .end(function(err, res) {
          console.log(res.body);
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.shopName).to.exist;
          expect(res.body.subscription.userId).to.equal(userId)
          expect(res.body.subscription.frequency).to.exist;
          expect(res.body.subscription.lastChecked).to.exist;
          done();
        });
    });
  });

  describe('create subscription to shop', function() {
    it('should create a subscription', function(done) {
      var shopName = fixtures.Subscription.sub1.shopName;
      var subscription = {
        frequency: 30,
        userId: 'temp'
      };

      request(app)
        .post(apiSuffix + '/' + shopName)
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
  });

  it('should not create a duplicate subscription', function(done) {
    var subscription = {};
    var duplicateFixture = fixtures.Subscription.sub1;

    subscription.shopName = duplicateFixture.shopName;
    subscription.frequency = duplicateFixture.frequency;
    subscription.userId = duplicateFixture.userId;

    request(app)
      .post(apiSuffix + '/' + subscription.shopName)
      .set(authHeader)
      .type('form')
      .send(subscription)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.exist;
        done();
      })
  });

  it('should not create a subscription if the userId doesn\'t exist', function(done) {
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
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.exist;
        done();
      })
  });

  describe('update subscription', function() {
    it('should update an existing subscription', function(done) {

      var updateFixture = fixtures.Subscription.sub1;

      request(app)
        .put(apiSuffix + '/' + updateFixture.shopName + '/' + updateFixture.subscriptions[0].userId)
        .set(authHeader)
        .type('form')
        .send({frequency: 120})
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body.shopName).to.equal(updateFixture.shopName);
          expect(res.body.subscription.frequency).to.equal(120);
          expect(res.body.subscription.userId).to.equal(updateFixture.subscriptions[0].userId);
          done();
        });
    });
  });

  describe('delete subscription', function() {
    it('should delete an existing subscription', function(done) {

      var shopName = fixtures.Subscription.sub3.shopName;
      var userId = fixtures.Subscription.sub3.subscriptions[0].userId;

      request(app)
        .delete(apiSuffix + '/' + shopName + '/' + userId)
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
