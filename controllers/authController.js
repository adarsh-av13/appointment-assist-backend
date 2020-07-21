const authService = require('../services/authService');
const User = require('../models/userModel');

const registerUser = async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let { hash, salt } = await authService.generateHash(password);
    User.create({
        username: username,
        hashpwd: hash,
        salt: salt,
        role: 'USER'
    }).then((_) => {
        res.redirect('/login');
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