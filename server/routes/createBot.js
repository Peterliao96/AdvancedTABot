const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UUID = require('uuid');

router.post('/',(req,res,next) => {
  fullName = req.body.fullName;
  UserId = req.body.UserId;
  description = req.body.description;
  avatar = req.body.avatar;
  console.log(UserId)
  User.updateOne({
    UserId:UserId
  },{
    '$push':{
      bots:[{
        UserId:UUID.v1(),
        fullName:fullName,
        description: description,
        avatar:avatar
      }]
    }
  })
  .then(result => {
    res.send({
      message:fullName + ' is created succesfully!'
    })
  })
  .catch(err => {
    console.log(err)
  })

});

module.exports = router;
