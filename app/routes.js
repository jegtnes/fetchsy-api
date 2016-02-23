var express = require('express');

var subscriptionsController = require('./controllers/subscription.js');
var usersController = require('./controllers/user.js');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: "hello world"});
})

router.route('/subscriptions')
  .get(subscriptionsController.getSubscriptions)
  .post(subscriptionsController.postSubscription);

router.route('/subscriptions/:subscriptionId')
  .get(subscriptionsController.getSubscription)
  .put(subscriptionsController.putSubscription)
  .delete(subscriptionsController.deleteSubscription);

router.route('/users')
  .get(usersController.getUsers)
  .post(usersController.postUser);

// router.route('/users/:user')

module.exports = router;
