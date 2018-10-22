const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  User.findOne({UserId:UserId})
  .then(result => {
    BotArrId = result.conversations.map(item => item.userOneId)
    BotArr = result.bots
    let chatList = []
    chatList = result.conversations.map(item => {
      let insertObject = {}
      insertObject.chatId = item.chatId
      insertObject.UserId = UserId
      insertObject.myName = result.fullName
      insertObject.myAvatar = result.avatar
      if(item.messages[item.messages.length - 1].text && item.messages[item.messages.length - 1].text.length > 30 ){
        insertObject.lastMsg = item.messages[item.messages.length - 1].text.slice(0,30) + '...'
      } else if (item.messages[item.messages.length - 1].text && item.messages[item.messages.length - 1].text.length <= 30) {
        insertObject.lastMsg = item.messages[item.messages.length - 1].text
      } else if (item.messages[item.messages.length-1].location){
        insertObject.lastMsg = '[location]'
      } else if (item.messages[item.messages.length-1].image){
        insertObject.lastMsg = '[image]'
      }
      insertObject.createdAt = item.messages[item.messages.length - 1].createdAt
      BotArr.forEach(function(bot){
        if(bot.UserId === item.userOneId){
          insertObject.fullName = bot.fullName
          insertObject.avatar = bot.avatar
          insertObject.BotId = bot.UserId
        }
      })
      return insertObject
    })
    console.log(chatList)
    res.send({
      chatList: chatList
    })
  })
});

module.exports = router;
