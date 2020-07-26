const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.post('/make', appointmentController.makeAppointment);
router.put('/cancel', appointmentController.cancelAppointment);
router.get('/my-appointments', appointmentController.getAppointmentsForConsultant);

module.exports = router;