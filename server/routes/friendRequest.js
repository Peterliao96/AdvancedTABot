const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/getRequestedList',(req,res,next)=> {
  UserId = req.body.UserId;
  console.log(UserId)
  User.findOne({UserId:UserId})
  .then(result => {
    res.send({
      requestedList: result.requested
    })
  })
  .catch(err => {
    console.log(err)
  })
});


router.post('/approveRequest',(req,res,next) => {
  UserId = req.body.UserId;
  RequestUserId = req.body.RequestUserId;
  User.findOne({UserId: RequestUserId})
  .then(result => {
    User.updateOne({UserId:UserId},{
      '$push':{
        friends:[{
          UserId: RequestUserId,
          fullName:result.fullName,
          email: result.email,
          description:result.description
        }]
      }
    })
    .exec()
    .then(doc => {
      User.findOne({UserId:UserId})
      .then(doc => {
        User.updateOne({UserId:RequestUserId},{
          '$push':{
            friends:[{
              UserId: UserId,
              fullName:doc.fullName,
              email:doc.email,
              description:doc.description
            }]
          }
        })
        .exec()
        .then(result => {
          User.updateOne({UserId:UserId},
            {
              $set:{
                "requested.$[elem].statusApproved":true
              }
            },
            {
              arrayFilters:[{"elem.UserId":RequestUserId}]
            })
          .exec()
          .then(result => {
            User.findOne({UserId:UserId})
            .then(result => {
              res.send({
                friendList:result.friends,
                requestedList:result.requested
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
        .catch(err => {
          console.log(err)
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
  .catch(err => {
    console.log(err)
  })
})

router.post('/ignoreRequest',(req,res,next) => {
  UserId = req.body.UserId;
  RequestUserId = req.body.RequestUserId;
  User.updateOne({UserId:UserId},
    {
      $set:{
        "requested.$[elem].statusIgnore":true
      }
    },
    {
      arrayFilters:[{"elem.UserId":RequestUserId}]
    })
  .exec()
  .then(result => {
    User.findOne({UserId:UserId})
    .then(result => {
      res.send({
        requestedList: result.requested
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
})

module.exports = router;
