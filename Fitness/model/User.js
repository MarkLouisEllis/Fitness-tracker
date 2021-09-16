//Model used to create new users

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    },
    date:{
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('users', userSchema);
