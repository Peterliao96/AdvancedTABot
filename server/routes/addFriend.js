const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/',(req,res,next) => {
  FriendId = req.body.FriendId;
  UserId = req.body.UserId;
  User.findOne({UserId:UserId})
  .then(result => {
    if(!result.request && !result.requested){
      User.updateOne({UserId:UserId},{
        $set:{
          request:[],
          requested:[]
        }
      })
      .exec()
      .then(doc => {
        User.findOne({UserId: FriendId})
        .then(friend => {
          User.updateOne({
            UserId:UserId
          },{
            '$push':{
              request:[{
                UserId:FriendId,
                email: friend.email,
                fullName: friend.fullName
              }]
            }
          })
          .exec()
          .then(user => {
            User.updateOne({
              UserId:FriendId
            },{
              '$push':{
                requested:[{
                  UserId:UserId,
                  email:result.email,
                  fullName:result.fullName,
                  statusApproved:false,
                  statusIgnore:false
                }]
              }
            })
            .exec()
            .then(doc => {
              res.send({
                message:'Successfully requested!',
                friend:result.request
              })
              return;
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
      })
    } else {
      User.findOne({UserId: FriendId})
      .then(friend => {
        User.updateOne({
          UserId:UserId
        },{
          '$push':{
            request:[{
              UserId:FriendId,
              email: friend.email,
              fullName: friend.fullName
            }]
          }
        })
        .exec()
        .then(user => {
          User.updateOne({
            UserId:FriendId
          },{
            '$push':{
              requested:[{
                UserId:UserId,
                email:result.email,
                fullName:result.fullName,
                statusApproved:false,
                statusIgnore:false
              }]
            }
          })
          .exec()
          .then(doc => {
            res.send({
              message:'Successfully requested!',
              friend:result.request
            })
            return;
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  })
});

module.exports = router;
