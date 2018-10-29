const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Diary = require('../models/diary');
const UUID = require('uuid');
router.post('/',(req,res,next) => {
  UserId = req.body.UserId;
  text = req.body.text;
  images = req.body.images;
  seeStatus = req.body.seeStatus;
  location = req.body.location;
  User.findOne({UserId:UserId}).then(user => {
    const diary = new Diary({
      diaryId:UUID.v4(),
      UserId:UserId,
      text:text,
      images:images,
      sendTime:new Date(),
      seeStatus:seeStatus,
      name: user.fullName,
      avatar:user.avatar,
      comment:[],
      location:location
    })
    User.updateOne({UserId:UserId},{
      '$push':{
        diary:[diary]
      }
    })
    .exec()
    .then(result => {
      diary.save()
      res.send({
        diary:diary,
        diaryId:diary.diaryId
      })
    })
  })
})

module.exports = router;
