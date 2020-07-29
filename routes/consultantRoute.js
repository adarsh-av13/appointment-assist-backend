const express = require('express');
const consultantController = require('../controllers/consultantController');
const passport = require('../config/passportConfig');
const router = express.Router();

router.get('/', consultantController.getAllProfiles);
router.get('/:id', consultantController.getProfile);
router.patch('/:id/edit-profile', passport.authenticate('jwt', { session: false }), consultantController.editProfile);

module.exports = router;