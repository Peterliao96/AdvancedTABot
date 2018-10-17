const express = require('express');
const router = express.Router();
const User = require('../models/user')
router.post('/uploadMyAvatar',(req,res,next) => {
  console.log(req.body)
  UserId = req.body.UserId;
  avatar = req.body.avatar;

})

router.post('/uploadBotAvatar',(req,res,next) => {
  UserId = req.body.UserId;
  avatar = req.body.avatar;

})

module.exports = router;
