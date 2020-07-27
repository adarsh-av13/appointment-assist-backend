const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.post('/make', appointmentController.makeAppointment);
router.put('/cancel/:id', appointmentController.cancelAppointment);
router.get('/:id', appointmentController.getAppointmentsForConsultant);

module.exports = router;