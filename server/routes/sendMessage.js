const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UUID = require('uuid');

router.post('/bot',(req,res,next) => {
  UserId = req.body.UserId;
  chatId = req.body.chatId;
  message = req.body.message;
  User.updateOne({UserId:UserId},{
    "$push":{
      "conversations.$[elem].messages":message
    }
  },
  {
    arrayFilters:[{"elem.chatId":chatId}]
  })
  .exec()
  .then(result => {
    res.send({
      msg:message
    })
  })
});

router.post('/autoReply',(req,res,next) => {
  UserId = req.body.UserId;
  chatId = req.body.chatId;
  text = req.body.text;
  BotId = req.body.BotId;
  User.findOne({UserId:UserId})
  .then(result => {
    BotsArr = result.bots;
    for(var i = 0;i<BotsArr.length;i++){
      if(BotsArr[i].UserId === BotId){
        let targetBot = BotsArr[i];
        const fullName = targetBot.fullName;
        const avatar = targetBot.avatar;
      }
    }
    const message = {
      _id:UUID.v4(),
      createdAt:new Date(),
      text:text,
      user:{
        _id:BotId,
        name:fullName,
        avatar:avatar
      }
    }
    console.log(message)
    User.updateOne({UserId:UserId},{
      "$push":{
        "conversations.$[elem].messages":message
      }
    },
    {
      arrayFilters:[{"elem.chatId":chatId}]
    })
    .exec()
    .then(result => {
      res.send({
        msg:message
      })
    })
  })
})

module.exports = router;
