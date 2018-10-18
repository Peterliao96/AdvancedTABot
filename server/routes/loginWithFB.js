const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/',(req,res,next) => {
  fullName = req.body.fullName;
  email = req.body.email;
  avatar = req.body.avatar;
  UserId = req.body.UserId;
  User.findOne({UserId:UserId})
  .then(result => {
    if(!result){
      const FBUser = new User({
        fullName: fullName,
        email:email,
        avatar:avatar + "?width=9999",
        UserId: UserId
      })
      FBUser.save().then(result => {
        res.send({
          message:'You have logined with Facebook Successfully!',
          FBuser:result
        })
        return;
      })
      return;
    }
    res.send({
      message: 'Welcome back',
      FBuser:result
    })
  })
});

module.exports = router;
