var express = require('express');

var subscriptionsController = require('./controllers/subscription.js');
var usersController = require('./controllers/user.js');
var authController = require('./controllers/auth');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: "hello world"});
})

router.route('/subscriptions')
  .get(authController.isAuthenticated, subscriptionsController.getSubscriptions)
  .post(authController.isAuthenticated, subscriptionsController.postSubscription);

router.route('/subscriptions/:subscriptionId')
  .get(authController.isAuthenticated, subscriptionsController.getSubscription)
  .put(authController.isAuthenticated, subscriptionsController.putSubscription)
  .delete(authController.isAuthenticated, subscriptionsController.deleteSubscription);

router.route('/users')
  .get(authController.isAuthenticated, usersController.getUsers)
  .post(authController.isAuthenticated, usersController.postUser);

router.route('/users/:userId')
  .get(usersController.getUser)

module.exports = router;
