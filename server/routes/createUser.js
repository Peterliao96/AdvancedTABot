const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/config');
const sanitizeUser = require('../helpers/sanitizeUser');

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

const getHashedPassword = (password) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};
router.post('/',(req,res,next) => {
    User.findOne({email: req.body.email})
    .then((user) => {
      if(!user){
        const hashedPassword = getHashedPassword(req.body.password);
        newUser = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashedPassword,
          avatar:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        })
        newUser.save()
        .then(result => {
          const token = JWT.sign({ email: newUser.email }, secret, { expiresIn });
          User.updateOne({
            email:req.body.email
          },{
            $set:{
              UserId: sanitizeUser(newUser).myId
            }
          })
          .then(result => {
            res.send({
              status:200,
              message: 'User has signed up successfully!',
              token: token,
              user: sanitizeUser(newUser)
            })
            return;
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
        return;
      }
      res.send({
        message: 'User already exists'
      })
    })
})

module.exports = router;
