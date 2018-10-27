const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Diary = require('../models/diary')
router.post('/',(req,res,next) => {
  diaryId = req.body.diaryId;
  UserId = req.body.UserId;
  commentId = req.body.commentId;
  diary = Diary.findOne({diaryId:diaryId})
  Diary.updateOne({diaryId:diaryId},{
    $pull:{
      comment:{
        commentId:commentId
      }
    }
  })
  .exec()
  .then(result => {
    User.updateOne({UserId:diary.UserId},{
      $pull:{
        "diary.$[elem].comment":{
          commentId:commentId
        }
      }
    },
    {
      arrayFilters:[{"elem.diaryId":diaryId}]
    })
    .exec()
    .then(result => {
      res.send({
        message:'Comment has been deleted!'
      })
    })
  })
})

module.exports = router;
