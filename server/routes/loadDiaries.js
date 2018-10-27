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

router.post('/loadAllDiaries',(req,res,next) => {
  UserId = req.body.UserId
  allDiaries = Diary.find()
  allDiaries.sort(function(a,b){
    return new Date(b.sendTime) - new Date(a.sendTime)
  })
  res.send({
    allDiaries:allDiaries
  })
})

module.exports = router;
