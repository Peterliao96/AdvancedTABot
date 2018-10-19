const express = require('express');
const router = express.Router();
const User = require('../models/user')
router.post('/',(req,res,next) => {
  BotId = req.body.BotId;
  UserId = req.body.UserId;
  fullName = req.body.fullName;
  description = req.body.description;
  avatar = req.body.avatar;
  User.updateOne({UserId:UserId},{
      $set:{
        "bots.$[elem].fullName":fullName,
        "bots.$[elem].description":description,
        "bots.$[elem].avatar":avatar
      }
    },
    {
      arrayFilters:[{"elem.UserId": BotId}]
  })
  .exec()
  .then(result => {
    res.send({
      message:'Update bot successfully!'
    })
  })

})

module.exports = router;
