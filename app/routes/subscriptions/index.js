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

router.get('/:subscriptionId', function(req, res) {
  Subscription.findById(req.params.subscriptionId, function(err, subscription) {
    if (!subscription) {
      return res.status(404).send({
        message: "Can't find the subscription."
      });
    }

    if (err) {
      return res.status(500).send(err);
    }

    return res.json(subscription);
  });
});

router.post('/', function(req, res) {
  var subscription = new Subscription();
  if (req.body.shopname != false && !req.body.frequency != false) {
    return res.status(400).json({message: 'Missing fields dawg'});
  }

  subscription.shopName = req.body.shopName;
  subscription.frequency = req.body.frequency;
  subscription.lastChecked = Date.now();

  subscription.save(function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json({
      message: 'Subscription added',
      data: subscription
    });
  });
});

router.put('/:subscriptionId', function(req, res) {
  Subscription.findById(req.params.subscriptionId, function(err, subscription) {
    if (err) {
      return res.status(500).send(err);
    }

    if (req.body.frequency === false && req.body.shopName === false) {
      return res.status(400).json({message: 'Missing fields, dawg'});
    }

    subscription.frequency = req.body.frequency || subscription.frequency;
    subscription.shopName = req.body.shopName || subscription.shopName;

    subscription.save(function(err) {
      if (err) {
        res.status(500).send(err);
      }

      return res.json(subscription);
    });
  });
});

module.exports = router;
