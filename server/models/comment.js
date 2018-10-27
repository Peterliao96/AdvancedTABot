const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentId:String,
  text:String,
  sendTime:Date,
  user:Object
})

module.exports = mongoose.model('Comment',commentSchema);
