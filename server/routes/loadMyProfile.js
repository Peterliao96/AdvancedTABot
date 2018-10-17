const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/',(req,res,next) => {
  UserId = req.body.UserId
  User.findOne({UserId:UserId})
  .then(result => {
    res.send({
      profile: result
    })
  })
})

module.exports = router;
