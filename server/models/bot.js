const mongoose = require('mongoose');
const botSchema = new mongoose.Schema({
  UserId: String,
  description: String,
  fullName: String,
  avatar:String,
  autoReply:String,
  TrainState:Boolean,
  NotificationState:Boolean,
  AutoReplyState:Boolean
})

module.exports = mongoose.model('Bot',botSchema);
