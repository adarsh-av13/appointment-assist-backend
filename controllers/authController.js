const authService = require('../services/authService');
const User = require('../models/userModel');
const Consultant = require('../models/consultantModel');

const registerUser = async(req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(422).json({
            error: true,
            msg: 'Invalid data'
        });
    }
    let hashpwd = await authService.generateHash(password);
    User.findOne({ email: email })
        .then((user) => {
            if (user == null) {
                User.create({
                    email: email,
                    hashpwd: hashpwd,
                    role: 'USER',
                    profile_setup: false
                }).then((user) => {
                    Consultant.create({
                        user_id: user.id,
                    }).then((_) => {
                        return res.status(200).json({
                            registration: 'success'
                        })
                    }).catch((err) => next(err));
                }).catch((err) => next(err));
            } else {
                return res.status(409).json({
                    error: true,
                    msg: 'User already exists'
                });
            }
        }).catch((err) => console.log(err));

}

const loginUser = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(422).json({
            error: true,
            msg: 'Invalid data'
        });
    }
    User.findOne({ email: email })
        .then(async(user) => {
            if (!user) {
                return res.status(401).json({
                    error: true,
                    msg: 'Invalid Username or Password'
                });
            }
            let isValid = await authService.validatePassword(password, user.hashpwd, user.salt);
            if (isValid) {
                let jwt = authService.issueToken(user._id);
                return res.status(200).json({
                    error: false,
                    msg: 'Login Successful',
                    token: jwt,
                    user_id: user._id,
                    profile_setup: user.profile_setup
                });
            } else {
                return res.status(401).json({
                    error: true,
                    msg: 'Invalid Username or Password'
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                error: true,
                msg: 'An unexpected error occured. Please try again later'
            });
        });
}

module.exports = {
    registerUser,
    loginUser,
}