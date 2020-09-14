const express = require('express');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { of } = require('rxjs');

const router = express.Router();

router.post('/register', asyncHandler(insert));
router.post('/login', asyncHandler(getUserByEmailIdAndPassword));

async function insert(req, res, next){
    const user = req.body;
    console.log(`registering user`, user);
    const savedUser = await userController.insert(user);
    res.json(savedUser);
}

async function getUserByEmailIdAndPassword(req, res, next){
    const user = req.body;
    console.log(`searching for user`, user);

    const savedUser = await userController.getUserByEmailIdAndPassword(
        user.email,
        user.password
    );
    if(savedUser == null)
    {
        console.log(`user is null`);
    }
    res.json(savedUser);
}

module.exports = router;