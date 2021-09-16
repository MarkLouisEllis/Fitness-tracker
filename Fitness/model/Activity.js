//todo model
//the usedId field is used to identify unique users

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    
    activities: [
      {
        id: String,
        text: String,
        type:String,
        duration: String,
      },
    ]
  },{ typeKey: '$type' });
  module.exports = mongoose.model("userActivities", activitySchema);