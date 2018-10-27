const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Diary = require('../models/diary');
router.post('/loadMyDiaries',(req,res,next) => {
  UserId = req.body.UserId;
  user = User.findOne({UserId:UserId})
  res.send({
    diary:user.diary
  })
})

router.post('/loadFriendDiaries',(req,res,next) => {
  UserId = req.body.UserId;
  user = User.findOne({UserId:UserId})
  res.send({
    diary:user.diary
  })
})

router.post('/loadAllDiaries',(req,res,next) => {
  UserId = req.body.UserId
  Diary.find().then(result => {
    allDiaries = result
    if(allDiaries.length !== 0) {
      allDiaries.sort(function(a,b){
        return b.sendTime - a.sendTime
      })
    }
    res.send({
      allDiaries:allDiaries
    })
  })
})

module.exports = router;
