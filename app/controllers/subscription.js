// var express = require('express');
//
// var env     = require('../env');
// var Subscription = require('../models/subscription');
//
// var router = express.Router();
var subscriptionController = {};
//
// subscriptionController.getSubscription = function(req, res) {
//   Subscription.findById(req.params.subscriptionId, function(err, subscription) {
//     if (!subscription) {
//       return res.status(404).send({
//         message: "Can't find the subscription."
//       });
//     }
//
//     if (err) {
//       return res.status(500).send(err);
//     }
//
//     return res.json(subscription);
//   });
// };
// //
// // subscriptionController.postSubscription = function(req, res) {
// //   var shop = new Shop();
// //   if (!req.body.frequency || !req.body.userId) {
// //     return res.status(400).json({message: 'Missing fields dawg'});
// //   }
// //
// //   shop.subscription.frequency = req.body.frequency;
// //   shop.subscription.userId = req.body.userId;
// //   shop.subscription.lastChecked = Date.now();
// //
// //   shop.save(function(err) {
// //     if (err) {
// //       // @TODO: Refactor this duplication into error handler helper w/ User.save
// //       if (err.name && err.name === 'ValidationError') {
// //         return res.status(422).send({
// //           message: "Duplicate shop subscription for this user"
// //         });
// //       }
// //
// //       return res.status(500).send(err);
// //     }
// //
// //     resourceURI = env.apiURL + '/shops/' + userId + '/' shopsubscription._id;
// //
// //     return res.status(201).header('Location', resourceURI).end();
// //   });
// // };
//
// subscriptionController.putSubscription = function(req, res) {
//   Subscription.findOne({_id: req.params.subscriptionId}, function(err, subscription) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//
//     if (req.body.frequency === false && req.body.shopName === false) {
//       return res.status(400).json({message: 'Missing fields, dawg'});
//     }
//
//     subscription.frequency = req.body.frequency || subscription.frequency;
//     subscription.shopName = req.body.shopName || subscription.shopName;
//
//     subscription.save(function(err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//
//       return res.json(subscription);
//     });
//   });
// };
//
// subscriptionController.deleteSubscription = function(req, res) {
//   Subscription.remove({_id: req.params.subscriptionId}, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//
//     return res.status(204).end();
//   });
// };
//
module.exports = subscriptionController;
