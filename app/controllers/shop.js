var express = require('express');

var env = require('../env');
var Shop = require('../models/shop.js');

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

shopController.postSubscription = function(req, res) {
  Shop.findOrCreate({shopName: req.params.shopName}, function(err, shop) {
    if (err) {
      res.send(err);
    }

    if (!req.body.frequency || !req.body.userId) {
      return res.status(400).json({message: 'Missing fields dawg'});
    }

    shop.subscriptions.push({
      frequency: req.body.frequency,
      userId: req.body.userId,
      lastChecked: Date.now()
    });

    shop.save(function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      resourceURI = env.apiURL + '/shops/' + shop.subscriptions[0].frequency + '/' + shop.subscriptions[0]._id;

      return res.status(201).header('Location', resourceURI).end();
    });
  });
};

module.exports = shopController;
