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
                    role: 'USER'
                }).then((user) => {
                    Consultant.create({
                        user_id: user.id
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

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authenticated' });
    }
}

module.exports = {
    registerUser,
    isAuthenticated
}