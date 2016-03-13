var mongoose = require('mongoose');
var id = new mongoose.Types.ObjectId;

var User = {
  user1: {
    _id: '56dea33788d072b46d511d5b',
    email: 'test1@test.com',
    password: 'testytest'
  },
  user2: {
    _id: '507f191e810c19729de860ea',
    email: 'test2@test.com',
    password: 'testytest?'
  },
  user3: {
    _id: '507f1f77bcf86cd799439011',
    email: 'test3@test.com',
    password: 'testytest!'
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
  sub4: {
    _id: new mongoose.Types.ObjectId,
    shopName: "ShinyFloofs",
    subscriptions: [
      {
        lastChecked: Date.now(),
        userId: User.user1._id,
        frequency: 60
      },
      {
        lastChecked: Date.now(),
        userId: User.user2._id,
        frequency: 15
      },
      {
        lastChecked: Date.now(),
        userId: User.user3._id,
        frequency: 120
      },
    ]
  },
  sub5: {
    _id: new mongoose.Types.ObjectId,
    shopName: "MockFullShop",
    subscriptions: [{
      lastChecked: Date.now(),
      userId: User.user1._id,
      frequency: 15
    }]
  },
  sub6: {
    _id: new mongoose.Types.ObjectId,
    shopName: "MockEmptyShop",
    subscriptions: [{
      lastChecked: Date.now(),
      userId: User.user1._id,
      frequency: 60
    }]
  },
  sub7: {
    _id: new mongoose.Types.ObjectId,
    shopName: "MockNonexistentShop",
    subscriptions: [{
      lastChecked: Date.now(),
      userId: User.user1._id,
      frequency: 60
    }]
  },
}

module.exports.User = User;
module.exports.Subscription = Subscription;
