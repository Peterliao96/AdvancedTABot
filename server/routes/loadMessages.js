const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  chatId = req.body.chatId;
  User.findOne({UserId:UserId}).then(result => {
    result.conversations.forEach(function(chat){
      if(chat.chatId === chatId){
        chatMsg = chat.messages
      }
    })
    res.send({
      messages:chatMsg.reverse(),
      id:chatId
    })
  })
})

module.exports = router;
