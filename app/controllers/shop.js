var express = require('express');

var env = require('../env');
var Shop = require('../models/shop.js');
var User = require('../models/user.js');

var shopController = {};

var router = express.Router();

shopController.getShops = function(req, res) {
  Shop.find(function(err, shops) {
    if (err) {
      res.send(err);
    }

    res.json(shops);
  });
};

shopController.getShop = function(req, res) {
  Shop.findOne({shopName: req.params.shopName}, function(err, shops) {
    if (err) {
      res.send(err);
    }

    res.json(shops);
  });
};

// @TODO: This is horrendous. Please refactor this, Alex 😭
shopController.postSubscription = function(req, res) {

  // if this is the shop's first sub, create it
  Shop.findOrCreate({shopName: req.params.shopName}, function(err, shop) {
    if (err) {
      res.send(err);
    }

    if (!req.body.frequency || !req.body.userId) {
      return res.status(400).json({message: 'Missing fields dawg'});
    }

    User.findOne({_id: req.body.userId}, function(err, user) {
      // check if user exists
      if (!user) {
        return res.status(422).send({message: "Can't find the user to update the subscription"});
      }

      // check for duplicates
      Shop.findOne(
        {
        shopName: req.params.shopName,
        'subscriptions.userId': req.body.userId,
        },
        { 'subscriptions.$': 1 },
        function(err, subscriptionResponse) {
          if (err) {
            return res.status(500).send(err);
          }

          if (subscriptionResponse) {
            return res.status(422).send({message: 'duplicate description dawg'})
          }

          // if there's no response to inner query, there's no duplicate
          // go ahead and add it to the collection
          shop.subscriptions.push({
            frequency: req.body.frequency,
            userId: req.body.userId,
            lastChecked: Date.now()
          });

          shop.save(function(err) {
            if (err) {
              return res.status(500).send(err);
            }

            resourceURI = env.apiURL + 'shops/' + shop.shopName + '/' + req.body.userId;

            return res.status(201).header('Location', resourceURI).end();
          });
        }
      );
    });
  });
};

shopController.getSubscription = function(req, res) {
  Shop.findOne({
    shopName: req.params.shopName,
    'subscriptions.userId': req.params.userId,
  }, {
    'subscriptions.$': 1
  }, function(err, subscriptionResponse) {
    if (err) {
      return res.status(500).send(err);
    }

    if (!subscriptionResponse) {
      return res.status(404).send({message: "Can't find a subscription to this shop under this username."})
    }

    var subscription = {
      _id: subscriptionResponse.id,
      shopName: req.params.shopName,
      subscription: subscriptionResponse.subscriptions[0]
    };

    return res.json(subscription);
  });
};

shopController.updateSubscription = function(req, res) {

  if (req.body.frequency === false) {
    return res.status(400).json({message: 'Missing fields, dawg'});
  }

  Shop.findOneAndUpdate({
    shopName: req.params.shopName,
    'subscriptions.userId': req.params.userId,
  }, {
    'subscriptions.$.frequency': parseInt(req.body.frequency, 10)
  }, {
    new: true,
    // select defines the things we want to return and nothing else
    select: {
      shopName: req.params.shopName,
      subscriptions: {
        $elemMatch: {
          userId: req.params.userId
        }
      }
    }
  },
  function(err, subscriptionResponse) {
    if (err) {
      return res.status(500).send(err);
    }

    // format the things we get back from select slightly differently
    return res.json({
      shopName: subscriptionResponse.shopName,
      subscription: subscriptionResponse.subscriptions[0]
    });

  });
};

shopController.deleteSubscription = function(req, res) {
  Shop.findOneAndUpdate(
    {
      shopName: req.params.shopName
    },
    {
      $pull: {
        subscriptions: {
          userId: req.params.userId
        }
      }
    },
    function(err, subscriptionResponse) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!subscriptionResponse) {
        return res.status(404).send({message: "Subscription not found. Soz!"});
      }

      return res.status(204).end();
    }
  );
};



module.exports = shopController;
