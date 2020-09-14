const mongoose = require('mongoose');
const { stringify } = require('querystring');

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    hashedPassword:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    roles:[
        {
            type:String
        }
    ],
    versionKey:false
});
module.exports = mongoose.model('User',UserSchema);