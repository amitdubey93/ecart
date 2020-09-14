const User = require('../models/user.model')

async function insert(user){
    //make a mongoose db call to save user in db
    console.log(`saving user to db`,user);
    return await new User(user).save();
}

module.exports = {
    insert
};