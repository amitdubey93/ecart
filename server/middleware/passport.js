const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userController = require('../controllers/user.controller');

const localLogin = new LocalStrategy(
    {
        usernameField:'email'
    },
    async(email, password, done)=>{
        const user = await userController.getUserByEmailIdAndPassword(email, password);
        return user?
        done(null, user):
        done(null, false, {
            error:'Invalid Credentials.'
        });
    }
)

const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwrSecret
    },
    async (payload, done)=>{
        const user = await userController.getUserById(payload._id);
        return user?
        done(null, user):
        done(null, false, {
            error:'Invalid Credentials.'
        });
    }
)

module.exports = passport.use(localLogin).use(jwtLogin);