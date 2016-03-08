var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;
var subscriptionSchema = new Schema({
  frequency: Number,
  lastChecked: { type: Date },
  userId: String
});

var shopSchema = new Schema({
  shopName: String,
  subscriptions: []
});

shopSchema.plugin(findOrCreate);

module.exports = mongoose.model('Subscription', shopSchema);
