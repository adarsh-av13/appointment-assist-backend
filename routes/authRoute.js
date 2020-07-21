const express = require('express');
const authController = require('../controllers/authController');
const passport = require('../config/passportConfig');
const router = express.Router();

router.post('/register', authController.registerUser);

router.get('/login', (req, res) => {
    res.send('HI');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/login-success', failureRedirect: '/login-failure' }));

router.get('/', authController.isAuthenticated, (req, res) => res.send("Hello There"));
router.get('/login-success', authController.isAuthenticated, (req, res) => res.send("Login Successful"));
router.get('/login-failure', (req, res) => res.send("Invalid Username or Password"));
router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})
module.exports = router;