var express = require('express');

var Subscription = require('../../models/subscription.js');

var router = express.Router();

router.get('/', function(req, res) {
  Subscription.find(function(err, subscriptions) {
    if (err) {
      res.send(err);
    }

    res.json(subscriptions);
  });
});

router.post('/', function(req, res) {
  var subscription = new Subscription();
  if (req.body.shopname != false && !req.body.frequency != false) {
    res.status(400);
    res.json({message: 'Missing fields dawg'});
  }

  subscription.shopName = req.body.shopName;
  subscription.frequency = req.body.frequency;
  subscription.lastChecked = Date.now();

  subscription.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({
      message: 'Subscription added',
      data: subscription
    });
  });
});

module.exports = router;
