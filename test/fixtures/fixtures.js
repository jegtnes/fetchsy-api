var mongoose = require('mongoose');
var id = new mongoose.Types.ObjectId;

var User = {
  user1: {
    _id: new mongoose.Types.ObjectId,
    email: 'test1@test.com',
    password: 'testytest'
  },
  user2: {
    _id: new mongoose.Types.ObjectId,
    email: 'test2@test.com',
    password: 'testytest'
  }
};

var Subscription = {
  sub1: {
    _id: new mongoose.Types.ObjectId,
    lastChecked: Date.now(),
    userId: User.user1._id,
    frequency: 15,
    shopName: "UnicornFluff"
  },
  sub2: {
    _id: new mongoose.Types.ObjectId,
    lastChecked: Date.now(),
    userId: User.user1._id,
    frequency: 60,
    shopName: "NostalgiaInc"
  },
  sub3: {
    _id: new mongoose.Types.ObjectId,
    lastChecked: Date.now(),
    userId: User.user2._id,
    frequency: 1,
    shopName: "CoolKidzSkateboardz"
  },
}

module.exports.User = User;
module.exports.Subscription = Subscription;
