//this file will contain all the CRUD functionality of the backend of my app for the user activity list

const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

const Activities = require('../model/Activity');
const User = require('../model/User');
const mongoose = require('mongoose');

//add activity
exports.add = async (req, res) => {

    //jwt verification. The jwt token isrequired through the headers. If the jwt token is veriefied the rest of the code will run
    const auth = req.headers[ 'authorization' ];
    const tokenSplit = auth.split( ' ' );
    const token =tokenSplit[1];
        try {
    const decoded = jwt.verify(token, keys.secretOrKey )
    
    } catch (err) {
    res.status( 401 ).send({ 'err' : 'Bad JWT!' })
    }
 
    //require the email of the user that logged in. If the email exists the code will run to add or create a todo list.
    const email = req.body.email;
    const activityItems = req.body.newActivities;
    const user = await User.findOne({email}).exec();
  
    
    //_id is used to determine the user that is logged in
    const activities = await Activities.findOne({ _id: user._id }).exec();
      if (!activities) {
        await Activities.create({
          _id: user._id,
          activities: activityItems
        });
      } else {
        activities.activities = activityItems;
        await activities.save();
      }
      res.json(activityItems);
    };
  
  //show activity list and auth request with JWT. To show only the activities of one user the user id is obtained from the JWT token and used to find that user. 
  exports.all = async (req, res) => {
    const auth = req.headers[ 'authorization' ];
    const tokenSplit = auth.split( ' ' );
    const token =tokenSplit[1];
   
        try {
    const decoded = jwt.verify(token, keys.secretOrKey )
    
    } catch (err) {
    res.status( 401 ).send({ 'err' : 'Bad JWT!' })
    }
    
    const decoded = jwt.verify(token, keys.secretOrKey )
    console.log({id:decoded.id})
    const user = await User.findOne({_id:decoded.id}).exec();
  
    const { activities } = await Activities.findOne( {_id: user._id } ).exec();
    res.json(activities);

  };






