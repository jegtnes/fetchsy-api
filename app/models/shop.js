var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;
var subscriptionSchema = new Schema({
  frequency: Number,
  lastChecked: { type: Date },
  userId: String
});

var shopSchema = new Schema({
  shopName: {
    type: String,
    unique: true
  },
  subscriptions: {
    type: [subscriptionSchema]
  }
});

shopSchema.index(
  { shopName: 1, "subscriptions.userId": 1 },
  { unique: true, sparse: true }
)

shopSchema.plugin(findOrCreate);

module.exports = mongoose.model('Subscription', shopSchema);
