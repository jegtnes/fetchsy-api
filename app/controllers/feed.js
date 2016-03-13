var express = require('express');

var env = require('../env');
var conf = require('../config');
var etsyURI = conf.get('etsyBaseURI');

var Feed = require('../models/feed');
var feedController = {};
var router = express.Router();

feedController.getFeed = function(req, res) {
  Feed.getFeed(etsyURI + req.params.shopName + '/rss', function(err, feedItems) {
    if (err) {
      res.status(500).send(err);
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
