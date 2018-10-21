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
      insertObject.lastMsg = item.messages[item.messages.length - 1].text
      insertObject.createdAt = item.messages[item.messages.length - 1].createdAt
      BotArr.forEach(function(bot){
        if(bot.UserId === item.userOneId){
          insertObject.fullName = bot.fullName
          insertObject.avatar = bot.avatar
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
