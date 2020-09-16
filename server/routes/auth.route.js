const express = require('express');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');

const router = express.Router();

router.post('/register', asyncHandler(insert), login);
//.post('/login', asyncHandler(getUserByEmailIdAndPassword), login);
router.post('/login', passport.authenticate('local',{session:false}), login);
router.get('/findme', passport.authenticate('jwt',{session:false}), login);
async function insert(req, res, next){
    const user = req.body;
    console.log(`registering user`, user);
    req.user = await userController.insert(user);
    next();
}

async function getUserByEmailIdAndPassword(req, res, next){
    const user = req.body;
    console.log(`searching for user`, user);

    const savedUser = await userController.getUserByEmailIdAndPassword(
        user.email,
        user.password
    );
    if(savedUser == null){ console.log(`user is null`); }
    req.user = savedUser;
    next();
}

function login(req, res){
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    })
}

module.exports = router;