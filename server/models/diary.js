const mongoose = require('mongoose');
const Comment = require('./comment');
const diarySchema = new mongoose.Schema({
  diaryId:String,
  UserId:String,
  text:String,
  images:Array,
  location:String,
  seeStatus:Number,
  sendTime:Date,
  avatar:String,
  name:String,
  comment:{type:Array,ref:Comment}
})

module.exports = mongoose.model('Diary',diarySchema);
