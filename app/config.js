var convict = require('convict');
var fileExists = require('file-exists');

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
    default: false,
    env: "API_KEY"
  },
  dbUrl: {
    doc: "Database URL",
    format: String,
    default: false,
    env: "DB_URL"
  }
});

var env = conf.get('env');
var confFile = process.cwd() + '/.' + env + '.config.json';

if (fileExists(confFile)) {
  conf.loadFile('.' + env + '.config.json');
}

conf.validate({strict: true});

module.exports = conf;
