var express = require('express');

var env     = require('../../env');
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

    resourceURI = env.apiURL + '/subscriptions/' + subscription._id;

    return res.status(201).header('Location', resourceURI).end();
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

router.delete('/:subscriptionId', function(req, res) {
  Subscription.findByIdAndRemove(req.params.subscriptionId, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(204).end();
  });
});

module.exports = router;
