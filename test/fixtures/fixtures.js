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
    shopName: "UnicornFluff",
    subscriptions: [
      {
        lastChecked: Date.now(),
        userId: User.user1._id,
        frequency: 15
      },
      {
        lastChecked: Date.now(),
        userId: User.user2._id,
        frequency: 60
      },
    ]
  },
  sub2: {
    _id: new mongoose.Types.ObjectId,
    shopName: "NostalgiaInc",
    subscriptions: [
      {
        lastChecked: Date.now(),
        userId: User.user1._id,
        frequency: 15
      }
    ]
  },
  sub3: {
    _id: new mongoose.Types.ObjectId,
    shopName: "CoolKidzSkateboardz",
    subscriptions: [
      {
        lastChecked: Date.now(),
        userId: User.user2._id,
        frequency: 60
      },
    ]
  },
}

module.exports.User = User;
module.exports.Subscription = Subscription;
