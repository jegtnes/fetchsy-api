var convict = require('convict');

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
  }
});

var env = conf.get('env');
conf.loadFile('.' + env + '.config.json');
conf.validate({strict: true});

module.exports = conf;
