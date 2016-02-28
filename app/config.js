var convict = require('convict');
var fs = require('fs');

var conf = convict({
  env: {
    doc: "The application environment.",
    format: ["prod", "dev", "test"],
    default: "dev",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3456,
    env: "PORT"
  },
  rootURL: {
    doc: "The root URL, complete with protocol.",
    format: "url",
    default: "http://localhost"
  },
  apiSuffix: {
    doc: "The suffix URL fragment to access the API.",
    format: String,
    default: "/api/v1/"
  },
  apiKey: {
    doc: "Admin API key to access API",
    format: String,
    default: false
  },
  dbUrl: {
    doc: "Database URL",
    format: String,
    default: false
  }
});

var env = conf.get('env');
var confFile = '.' + env + '.config.json';

// file exists?
if (fs.statSync(confFile).isFile()) {
  conf.loadFile('.' + env + '.config.json');
}

conf.validate({strict: true});

module.exports = conf;
