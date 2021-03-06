var express = require('express');

var shopController = require('./controllers/shop');
var usersController = require('./controllers/user');
var feedController = require('./controllers/feed');
var authController = require('./controllers/auth');

var router = express.Router();

router.route('/')
  .get(authController.isAuthenticated, function(req, res) {
    res.json({message: "hello world"});
  })

router.route('/shops')
  .get(authController.isAuthenticated, shopController.getShops)

router.route('/shops/:shopName')
  .get(authController.isAuthenticated, shopController.getShop)
  .post(authController.isAuthenticated, shopController.postSubscription)

router.route('/shops/:shopName/feed')
  .get(authController.isAuthenticated, feedController.getFeed);

router.route('/shops/:shopName/:userId')
  .get(authController.isAuthenticated, shopController.getSubscription)
  .put(authController.isAuthenticated, shopController.updateSubscription)
  .delete(authController.isAuthenticated, shopController.deleteSubscription);

router.route('/users')
  .get(authController.isAuthenticated, usersController.getUsers)
  .post(authController.isAuthenticated, usersController.postUser);

router.route('/users/:userId')
  .get(usersController.getUser)

module.exports = router;
