//this file will contain all the CRUD functionality of the backend of my app for the admin page

const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
const User = require('../model/User');
const mongoose = require('mongoose');


  //show all users
  exports.all = async (req, res) => {
    //req jwt toke
        const auth = req.headers[ 'authorization' ];
        const tokenSplit = auth.split( ' ' );
        const token =tokenSplit[1];
    //verify token
      try {
        const decoded = jwt.verify(token, keys.secretOrKey )
        if(decoded.admin === true){}
        } catch (err) {
        res.status( 401 ).send({ 'err' : 'Bad JWT!' })
        }
    //find all users
      User.find(function(err,users){
          if (err) {
              console.log(err);
          }else {
              res.json(users);
          }
      })  
  };

  
   //delete user
   exports.remove = (req, res,next) => {
    //req jwt token
        const auth = req.headers[ 'authorization' ];
        const tokenSplit = auth.split( ' ' );
        const token =tokenSplit[1];
        console.log(token)
    //verify token
        try {
          const decoded = jwt.verify(token, keys.secretOrKey )
          console.log(decoded.admin)
          if(decoded.admin === true){}
          } catch (err) {
          res.status( 401 ).send({ 'err' : 'Bad JWT!' })
          }
    //Find user by id and remove that user
        User.findByIdAndRemove(req.params.id, (err,res,next)=>{
            console.log(req.params.id)
            if(err){
                return next(err);
            }  
        })  
  };

   //update users
   exports.update = async (req, res,next) => {
    //req jwt token
    const auth = req.headers[ 'authorization' ];
        const tokenSplit = auth.split( ' ' );
        const token =tokenSplit[1];
        console.log(token)
    //verify token
        try {
          const decoded = jwt.verify(token, keys.secretOrKey )
          console.log(decoded.admin)
          if(decoded.admin === true){}
          } catch (err) {
          res.status( 401 ).send({ 'err' : 'Bad JWT!' })
          }
    //find user by id and update body req from body of request
    User.findByIdAndUpdate(req.params.id,{
        $set:req.body
        },(err,data)=>{
            if(err){
                return next(err);
            }else{
             res.json(data)
             console.log('user updated')
            }
        })
  };

