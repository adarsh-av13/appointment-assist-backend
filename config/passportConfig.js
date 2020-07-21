const passport = require('passport');
const User = require('../models/userModel');
const localStategy = require('passport-local').Strategy;
const authService = require('../services/authService')


let verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then(async(user) => {

            if (!user) { return done(null, false) }
            let isValid = await authService.validatePassword(password, user.hashpwd, user.salt);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}
let strategy = new localStategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

module.exports = passport;