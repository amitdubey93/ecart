users = [];
async function insert(user){
    //make a mongoose db call to save user in db
    console.log(`saving user to db`,user);
    users.push(user);
    return users;
}

module.exports = {
    insert
};