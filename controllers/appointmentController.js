const Appointment = require('../models/appointmentModel');

const makeAppointment = async(req, res, next) => {
    let newAppointment;
    try {
        newAppointment = await Appointment.create({
            consultant_id: req.body.consultant_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            tokenNo: req.body.tokenNo,
            date: Date.now(),
            status: 'pending'
        });
    } catch (err) {
        next(err);
    }

    newAppointment.save().then((appointment) => {
        res.status(200).json({
            error: false,
            msg: 'Booking Successful',
            ...appointment
        });
    }).catch((err) => next(err));
}

const cancelAppointment = async(req, res, next) => {
    let appointment;
    try {
        appointment = await Appointment.findById(req.params.id);
        appointment.status = 'cancelled';
    } catch (err) {
        next(err);
    }
    appointment.save()
        .then((appointment) => {
            res.status(200).json({
                error: false,
                msg: 'Cancellation Successful'
            });
        }).catch((err) => next(err));
}

const getAppointmentsForConsultant = (req, res, next) => {
    Appointment.find({ consultant_id: req.params.id })
        .then((appointments) => {
            res.status(200).json(appointments);
        }).catch((err) => next(err));
}

module.exports = {
    makeAppointment,
    cancelAppointment,
    getAppointmentsForConsultant,
}