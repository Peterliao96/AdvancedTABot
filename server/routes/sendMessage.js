const express = require('express');
const router = express.Router();
const User = require('../models/user');

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

module.exports = router;
