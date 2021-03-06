var express = require('express');

var env = require('../env');
var conf = require('../config');
var etsyURI = conf.get('etsyBaseURI');

var Feed = require('../models/feed');
var feedController = {};
var router = express.Router();

feedController.getFeed = function(req, res) {
  var options = req.query ? req.query : false;

  Feed.getFeed(etsyURI + req.params.shopName + '/rss', options, function(err, feedItems) {
    if (err) {
      res.status(err.errorCode ? err.errorCode : 500).send(err);
    }

    if (feedItems.length === 0) {
      res.status(204).send(feedItems);
    }

    else {
      res.status(200).send(feedItems);
    }
  });
};

module.exports = feedController;
