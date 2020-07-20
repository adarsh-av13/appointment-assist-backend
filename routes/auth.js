const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.registerUser);

router.get('/login', (req, res) => {
    res.send('HI');
});

module.exports = router;