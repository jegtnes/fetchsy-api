var express =      require('express');
var mongoose =     require('mongoose');
var bodyParser =   require('body-parser');

var Subscription = require('./app/models/subscription');
var router =       require('./app/routes/index');
mongoose.connect('mongodb://localhost/fetchsy');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3456;

app.use('/api/v1', router);

app.listen(port);
console.log('Listening on', + port);
