const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Diary = require('../models/diary');
router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  diaryId = req.body.diaryId;
  User.updateOne({UserId:UserId},{
    $pull:{
      diary:{
        diaryId:diaryId
      }
    }
  })
  .exec()
  .then(result => {
    Diary.delete({diaryId:diaryId}).exec()
    res.send({
      message:'The diary is deleted!'
    })
  })
})

module.exports = router;
