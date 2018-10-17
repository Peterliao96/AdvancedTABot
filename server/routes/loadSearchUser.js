const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/',(req,res,next) => {
  fullName = req.body.fullName;
  User.find({fullName: fullName})
  .then(result => {
    console.log(result)
    res.send({
      userInfo: result
    })
  })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;
