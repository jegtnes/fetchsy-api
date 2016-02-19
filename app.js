var express = require('express');

var app = express();

var port = process.env.PORT || 3456;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: "hello world"});
})

app.use('/api/v1', router);

app.listen(port);
console.log('Listening on', + port);
