var express = require('express');

var User = require('../models/user.js');
var env     = require('../env');

var router = express.Router();
var userController = {};

userController.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(users);
  });
}

userController.getUser = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (!user) {
      return res.status(404).send({
        message: "Can't find the user."
      });
    }

    if (err) {
      return res.status(500).send(err);
    }

    return res.json(user);
  });
}

userController.postUser = function(req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({message: 'Missing fields, dawg'});
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    var resourceURI = env.apiURL + 'users/' + user._id;

    return res.status(201).header('Location', resourceURI).end();
  });
}

module.exports = userController;
