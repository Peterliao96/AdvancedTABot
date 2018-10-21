const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  chatId = req.body.chatId;
  User.updateOne({UserId:UserId},{
    $pull:{
      conversations:{
        chatId: chatId
      }
    }
  })
  .exec()
  .then(result => {
    res.send({
      message:'The conversation is delted!'
    })
  })
})

module.exports = router;
