const mongoose = require('mongoose');
const Message = require('./message')
const conversationSchema = new mongoose.Schema({
  chatId: String,
  userOneId: String,
  userTwoId: String,
  messages: {type:Array,ref:Message}
});

module.exports = mongoose.model('Conversation', conversationSchema);
