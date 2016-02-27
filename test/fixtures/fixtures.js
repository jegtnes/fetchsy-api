var mongoose = require('mongoose');
var id = new mongoose.Types.ObjectId;

module.exports.User = {
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
