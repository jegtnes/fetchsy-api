var expect = require('chai').expect;
var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../app/config');

var apiSuffix = conf.get('apiSuffix') + "users";
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../app');
app.use(bodyParser.urlencoded({
  extended: true
}));


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
          console.log(res.body);
          done();
        });
    })
  });
});
