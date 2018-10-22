const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UUID = require('uuid');

router.post('/',(req,res,next) => {
  fullName = req.body.fullName;
  UserId = req.body.UserId;
  description = req.body.description;
  avatar = req.body.avatar;
  BotId = UUID.v1();
  User.updateOne({
    UserId:UserId
  },{
    '$push':{
      bots:[{
        UserId:BotId,
        fullName:fullName,
        description: description,
        avatar:avatar,
        TrainState:false,
        NotificationState:false,
        AutoReplyState:false,
        AutoReplyAIState:false,
        autoReply:'I am busy now. Please leave me a message here. Thanks!'
      }]
    }
  })
  .then(result => {
    res.send({
      message:fullName + ' is created succesfully!',
      BotId:BotId
    })
  })
  .catch(err => {
    console.log(err)
  })

});

module.exports = router;
