const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Diary = require('../models/diary')
const UUID = require('uuid')
router.post('/',(req,res,next) => {
  diaryId = req.body.diaryId;
  UserId = req.body.UserId;
  text = req.body.text;
  user = User.findOne({UserId:UserId})
  const comment = {
    commentId:UUID.v4(),
    text:text,
    sendTime:new Date(),
    user:{
      UserId:UserId,
      avatar:user.avatar,
      name:user.fullName
    }
  }
  Diary.updateOne({diaryId:diaryId},{
    '$push':{
      comment:[comment]
    }
  })
  .exec()
  .then(result => {
    diary = Diary.findOne({diaryId:diaryId})
    User.updateOne({UserId:diary.UserId},{
      "$push":{
        "diary.$[elem].comment":comment
      }
    },
    {
      arrayFilters:[{"elem.diaryId":diaryId}]
    })
    .exec()
    .then(result => {
      res.send({
        comment:comment,
        message:'add comment successfully'
      })
    })
  })
})

module.exports = router;
