const express = require('express');
const router = express.Router();
const User = require('../models/user')
router.post('/',(req,res,next) => {
  friendId = req.body.friendId;
  UserId = req.body.UserId;
  User.findOne({UserId: UserId})
  .then(result => {
    User.updateOne({UserId:UserId},{
      $pull:{
        friends:{
          UserId: friendId
        }
      }
    })
    .exec()
    .then(result => {
      User.updateOne({UserId:friendId},{
        $pull:{
          friends:{
            UserId:UserId
          }
        }
      })
      .exec()
      .then(result => {
        res.send({
          friendData: req.body,
          message: 'The friend is deleted!'
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
});

module.exports = router;
