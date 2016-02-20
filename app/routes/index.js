var express = require('express');

var subscriptionsRoute = require('./subscriptions/index.js');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: "hello world"});
})

router.use('/subscriptions', subscriptionsRoute);

module.exports = router;
