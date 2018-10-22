const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  BotId = req.body.BotId;
  id = req.body.id;
  value = req.body.value
  if(id === '1' && value){
    User.updateOne({UserId:UserId},{
        $set:{
          "bots.$[elem].TrainState":value,
          "bots.$[elem].AutoReplyState":value
        }
      },
      {
        arrayFilters:[{"elem.UserId": BotId}]
    })
    .exec()
  } else if (id === '1' && !value){
    User.updateOne({UserId:UserId},{
        $set:{
          "bots.$[elem].TrainState":value
        }
      },
      {
        arrayFilters:[{"elem.UserId": BotId}]
    })
    .exec()
  } else if(id === '2'){
    User.updateOne({UserId:UserId},{
        $set:{
          "bots.$[elem].NotificationState":value
        }
      },
      {
        arrayFilters:[{"elem.UserId": BotId}]
    })
    .exec()
  } else if(id === '3'){
    User.findOne({UserId:UserId}).then(result => {
      for(var i = 0;i<result.bots.length;i++){
        if(result.bots[i].UserId === BotId){
          bot = result.bots[i]
        }
      }
      if(bot.TrainState){
        User.updateOne({UserId:UserId},{
            $set:{
              "bots.$[elem].AutoReplyState":true
            }
          },
          {
            arrayFilters:[{"elem.UserId": BotId}]
        })
        .exec()
      } else {
        User.updateOne({UserId:UserId},{
            $set:{
              "bots.$[elem].AutoReplyState":value
            }
          },
          {
            arrayFilters:[{"elem.UserId": BotId}]
        })
        .exec()
      }
    })
  }
  res.send({
    msg:'It is updated'
  })
})

module.exports = router;
