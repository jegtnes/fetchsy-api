var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Subscription', new Schema({
  shopName: String,
  frequency: Number,
  lastChecked: { type: Date },
  userId: String
}));
