var express =      require('express');
var mongoose =     require('mongoose');
var bodyParser =   require('body-parser');

var conf =         require('./app/config')
var router =       require('./app/routes/index');

var Subscription = require('./app/models/subscription');
mongoose.connect('mongodb://localhost/fetchsy');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1', router);

app.listen(conf.get('port'));
console.log('Listening on', + conf.get('port'));
