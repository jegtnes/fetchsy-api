// @TODO: Make sure userId belongs to real user
// @TODO: Frequency validation

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
  shopName: String,
  frequency: Number,
  lastChecked: { type: Date },
  userId: String
});

subscriptionSchema.index({ shopName: true, userId: true }, { unique: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
