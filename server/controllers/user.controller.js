const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function insert(user){
    //make a mongoose db call to save user in db
    
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    console.log(`saving user to db`,user);
    return await new User(user).save();
}

async function getUserByEmailIdAndPassword(email, password){
    let user = await User.findOne({email});
    console.log(`findOne`,user);
    if( isUserValid (user, password, user.hashedPassword)){
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    }
    else{
        return null;
    }
 
    function isUserValid(user, password, hashedPassword){
        return user && bcrypt.compareSync(password, hashedPassword);
    }
 }

 async function getUserById(_id){
    let user = await User.findById({_id});
    console.log(`findOne`,user);
    if(user){
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    }
    else{
        return null;
    }
 }

module.exports = {
    insert,
    getUserByEmailIdAndPassword,
    getUserById
};