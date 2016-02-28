var expect = require('chai').expect;
var request = require('supertest');
var bodyParser = require('body-parser');

var conf = require('../../../app/config');

var apiSuffix = conf.get('apiSuffix');
var authHeader = {'Authorization': 'Bearer ' + conf.get('apiKey')}

var app = require('../../../app');
app.use(bodyParser.urlencoded({
  extended: true
}));

describe('authentication', function() {
  it('should be unauthorised if using wrong credentials', function(done) {
    request(app)
      .get(apiSuffix)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });
});
