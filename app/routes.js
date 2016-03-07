var express = require('express');

var subscriptionsController = require('./controllers/subscription.js');
var usersController = require('./controllers/user.js');
var authController = require('./controllers/auth');

var router = express.Router();

router.route('/')
  .get(authController.isAuthenticated, function(req, res) {
    res.json({message: "hello world"});
  })

router.route('/shops')
  .get(authController.isAuthenticated, subscriptionsController.getAllSubscriptions)

router.route('/shops/:shopName')
  .get(authController.isAuthenticated, subscriptionsController.getSubscriptions)

router.route('/shops/:shopName/:userId')
  .get(authController.isAuthenticated, subscriptionsController.getSingleSubscription)
  .put(authController.isAuthenticated, subscriptionsController.updateSubscription)
  .post(authController.isAuthenticated, subscriptionsController.postSubscription)
  .delete(authController.isAuthenticated, subscriptionsController.deleteSubscription);

router.route('/users')
  .get(authController.isAuthenticated, usersController.getUsers)
  .post(authController.isAuthenticated, usersController.postUser);

router.route('/users/:userId')
  .get(usersController.getUser)

module.exports = router;
