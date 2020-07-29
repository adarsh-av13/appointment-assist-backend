const express = require('express');
const authController = require('../controllers/authController');
const passport = require('../config/passportConfig');
const router = express.Router();

router.post('/register', authController.registerUser);

router.get('/login', (req, res) => {
    res.send('HI');
});

router.post('/login', authController.loginUser);

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => res.send("Hello There"));

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})
module.exports = router;