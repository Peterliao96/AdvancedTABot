const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UUID = require('uuid')

router.post('/myFirstConversation',(req,res,next) => {
  userOneId = req.body.UserId;
  userTwoId = req.body.RequestUserId;
  msg = "Let's start our first chat!";
  firstConversation = {
    chatId: UUID.v1(),
    userOneId:userOneId,
    userTwoId:userTwoId,
    messages:[]
  }
  firstMessage = {
    text:msg,
    createdAt:new Date(),
    userId:userOneId
  }
  User.updateOne({UserId:userOneId},{
    "$push":{
      conversations:[firstConversation]
    }
  })
  .exec()
  .then(result => {
    User.updateOne({UserId:userOneId,"conversations.userOneId":userOneId,"conversations.userTwoId":userTwoId},{
      "$push":{
        "conversations.$.messages":firstMessage
      }
    })
    .exec()
    .then(result => {
      User.updateOne({UserId:userTwoId},{
        "$push":{
          conversations:[firstConversation]
        }
      })
      .exec()
      .then(result => {
        User.updateOne({UserId:userTwoId,"conversations.userOneId":userOneId,"conversations.userTwoId":userTwoId},{
          "$push":{
            "conversations.$.messages":firstMessage
          }
        })
        .exec()
        .then(result => {
          User.findOne({UserId:userTwoId})
          .then(result => {
            chatList = [{
              fullName:result.fullName,
              avatar:result.avatar,
              lastMsg:msg,
              lastTime:firstMessage.createdAt
            }]
            res.send({
              firstMessage:firstMessage,
              chatList:chatList
            })
          })
        })
      })
    })
  })
})

router.post('/receiveFirstConversation',(req,res,next) => {
  userOneId = req.body.UserId;
  userTwoId = req.body.RequestUserId;
  User.findOne({UserId:userTwoId})
  .then(result => {
    createdAt = result.conversations.messages.createdAt
    msg = result.conversations.messages.text
    firstMessage = {
      text:msg,
      createdAt:createdAt,
      userId:userOneId
    }
    User.findOne({UserId:userOneId})
    .then(result => {
      chatList = [{
        fullName:result.fullName,
        avatar:result.avatar,
        lastMsg:msg,
        lastTime:firstMessage.createdAt
      }]
      res.send({
        firstMessage:firstMessage,
        chatList:chatList
      })
    })
  })
})

module.exports = router;
