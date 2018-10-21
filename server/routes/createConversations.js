const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UUID = require('uuid')

router.post('/myFirstBotConversation',(req,res,next) => {
  userOneId = req.body.BotId;
  userTwoId = req.body.UserId;
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
  User.updateOne({UserId:userTwoId},{
    "$push":{
      conversations:[firstConversation]
    }
  })
  .exec()
  .then(result => {
    User.updateOne({UserId:userTwoId},{
      "$push":{
        "conversations.$[elem].messages":firstMessage
      }
    },
    {
      arrayFilters:[{"elem.userOneId":userOneId}]
    })
    .exec()
    .then(result => {
      User.findOne({UserId:userTwoId})
      .then(result => {
        BotArr = result.bots;
        for(var i =0;i<BotArr.length;i++){
          if(BotArr[i].UserId === userOneId){
            fullName = BotArr[i].fullName;
            avatar = BotArr[i].avatar;
            break;
          }
        }
        chatItem = {
          chatId:firstConversation.chatId,
          fullName: fullName,
          avatar: avatar,
          lastMsg: msg,
          createdAt: firstMessage.createdAt
        }
        res.send({
          firstMessage:firstMessage,
          chatItem:chatItem
        })
      })
    })
  })
})
router.post('/myFirstFriendConversation',(req,res,next) => {
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
    User.updateOne({UserId:userOneId},{
      "$push":{
        "conversations.$[elem].messages":firstMessage
      }
    },
    {
      arrayFilters:[{"elem.userTwoId":userTwoId}]
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
        User.updateOne({UserId:userTwoId},{
          "$push":{
            "conversations.$[elem].messages":firstMessage
          }
        },
        {
          arrayFilters:[{"elem.userOneId":userOneId}]
        })
        .exec()
        .then(result => {
          User.findOne({UserId:userTwoId})
          .then(result => {
            chatItem = {
              chatId:firstConversation.chatId,
              fullName:result.fullName,
              avatar:result.avatar,
              lastMsg:msg,
              lastTime:firstMessage.createdAt
            }
            res.send({
              firstMessage:firstMessage,
              chatItem:chatItem
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
      chatItem = {
        fullName:result.fullName,
        avatar:result.avatar,
        lastMsg:msg,
        lastTime:firstMessage.createdAt
      }
      res.send({
        firstMessage:firstMessage,
        chatItem:chatItem
      })
    })
  })
})

module.exports = router;
