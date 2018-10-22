const express = require('express');
const router = express.Router()
const User = require('../models/user');

router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  BotId = req.body.BotId;
  autoReply = req.body.autoReply;
  User.updateOne({UserId:UserId},{
      $set:{
        "bots.$[elem].autoReply":autoReply
      }
    },
    {
      arrayFilters:[{"elem.UserId": BotId}]
  })
  .exec()
  .then(result => {
    res.send({
      message:"OK"
    })
  })
})

module.exports = router;
