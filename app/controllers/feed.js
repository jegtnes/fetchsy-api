var express = require('express');

var env = require('../env');

var feedController = {};
var router = express.Router();

feedController.getFeed = function(req, res) {
  res.sendStatus(500).end();
};

module.exports = feedController;
