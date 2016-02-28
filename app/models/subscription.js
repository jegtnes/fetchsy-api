// @TODO: Make sure userId belongs to real user
// @TODO: Frequency validation
// @TODO: Duplication check (userId & shopName)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Subscription', new Schema({
  shopName: String,
  frequency: Number,
  lastChecked: { type: Date },
  userId: String
}));
