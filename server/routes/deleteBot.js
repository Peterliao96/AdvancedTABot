const express = require('express');
const router = express.Router()
const User = require('../models/user');

router.post('/',(req,res,next) => {
  BotId = req.body.BotId;
  UserId = req.body.UserId;
  User.findOne({UserId: UserId})
  .then(result => {
    User.updateOne({UserId:UserId},{
      $pull:{
        bots:{
          UserId: BotId
        }
      }
    })
    .exec()
    .then(result => {
      res.send({
        BotData: req.body,
        message: 'The bot is deleted!'
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
})

module.exports = router;
