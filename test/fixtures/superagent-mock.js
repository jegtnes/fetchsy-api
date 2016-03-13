var env = require('../../app/env');

console.log(env.apiURL);

module.exports = [{
  pattern: env.apiURL,
  fixtures: function(match, params, headers) {

  }
}]
