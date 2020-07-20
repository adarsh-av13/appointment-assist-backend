const authService = require('../services/auth');
const User = require('../models/user');

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

module.exports = {
    registerUser,
}