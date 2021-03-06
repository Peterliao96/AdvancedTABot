const mongoose = require('mongoose');
const Bot = require('./bot');
const Requested = require('./requested')
const Conversation = require('./conversation');
const Diary = require('./diary');

const userSchema = new mongoose.Schema({
  UserId: String,
  fullName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    unique: true
  },
  description: String,
  avatar: String,
  password: {
    type: String
  },
  requested:{
    type:Array,
    ref: Requested
  },
  request:{
    type:Array,
    ref:'User'
  },
  friends: {
    type:Array,
    ref:'User'
  },
  bots:{
    type: Array,
    ref: Bot
  },
  conversations: {
    type:Array,
    ref:Conversation
  },
  diary:{
    type:Array,
    ref:Diary
  }
});

module.exports = mongoose.model('User', userSchema);
