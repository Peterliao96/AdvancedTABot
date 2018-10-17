const express = require('express');
const router = express.Router();
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const sanitizeUser = require('../helpers/sanitizeUser');
const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

router.post('/',(req,res,next) => {
  User.findOne({email:req.body.email})
  .then((user) => {
    if(!user){
      res.send({
        message: 'Wrong email! Please try again!'
      })
      return;
    } else if(!user.password){
      res.send({
        message:'Wrong email! Please try again!'
      })
      return;
    }
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    console.log('what is this',passwordMatch)
    if(!passwordMatch){
      res.send({
        message:'Wrong password! Please try again!'
      })
      return;
    }
    const token = JWT.sign({ email: user.email }, secret, { expiresIn });
    User.updateOne({
      email:user.email
    },{
      $set:{
        UserId: sanitizeUser(user).myId
      }
    })
    .then(result => {
      res.send({
        token: token,
        user: sanitizeUser(user)
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;
