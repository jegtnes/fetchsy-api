var chai = require('chai');
var expect = require('chai').expect;
chai.use(require('chai-things'));
var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../../app/config');
var fixtures = require('../../fixtures/fixtures');

var apiSuffix = conf.get('apiSuffix') + "users";
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../../app');
app.use(bodyParser.urlencoded({
  extended: true
}));

// @TODO: Tests for 404s. Tests for bad data

describe('User routes', function() {
  describe('signup', function() {
    it('should create a user', function(done) {

      var user = {
        email: 'youwhat@m8.com',
        password: 'n3ckb34rd'
      }

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(user)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(201);
          expect(res.get('Location')).to.exist;
          done();
        });
    });

    it('should prevent creating a user with a duplicate email', function(done) {
      var user = {
        email: 'test1@test.com',
        password: 'youwhatm8'
      }

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(422);
          expect(res.body.message).to.exist;
          expect(res.body.errors).to.be.an.array;
          expect(res.body.errors).to.not.be.empty;
          done();
      });
    });

    it('should prevent an invalid email from being registered', function(done) {
      var user = {
        email: 'test1@2',
        password: 'youwhatm8'
      };

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(422);
          expect(res.body.message).to.exist;
          expect(res.body.errors).to.be.an.array;
          expect(res.body.errors).to.not.be.empty;
          done();
        });
    });

    it('should allow an obscure, but valid email, to be registered', function(done) {
      var user = {
        email: '!#$%&`*+/=?^`{|}~@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghikl.com',
        password: 'youwhatm8'
      };

      request(app)
        .post(apiSuffix)
        .set(authHeader)
        .type('form')
        .send(user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.get('Location')).to.exist;
          done();
        });
    });
  });

  describe('show users', function() {
    it('should show users', function(done) {
      request(app)
        .get(apiSuffix)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          expect(res.body).to.all.have.property('email');
          done();
        });
    });
  });

  describe('show single user', function() {
    it('should show a single user', function(done) {
      var fixtureId = fixtures.User.user1._id;

      request(app)
        .get(apiSuffix + '/' + fixtureId)
        .set(authHeader)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.ok;
        })
      done();
    });
  });
});
