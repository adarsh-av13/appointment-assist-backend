const express = require('express');
const consultantController = require('../controllers/consultantController');

const router = express.Router();

router.get('/', consultantController.getAllProfiles);
router.get('/:id', consultantController.getProfile);
router.put('/edit-profile/:id', consultantController.editProfile);

module.exports = router;