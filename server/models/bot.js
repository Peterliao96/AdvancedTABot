const mongoose = require('mongoose');
const botSchema = new mongoose.Schema({
  UserId: String,
  description: String,
  fullName: String,
  avatar:String
})

module.exports = mongoose.model('Bot',botSchema);
