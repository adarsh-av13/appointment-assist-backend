const appointmentModel = require('../models/appointmentModel');

const makeAppointment = (req, res, next) => {
    let newAppointment = {
        consultant_id: req.body.consultant_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        tokenNo: req.body.tokenNo,
        date: Date.now(),
        status: 'Pending'
    }
    appointmentModel.create(newAppointment)
        .then((appoinment) => {
            res.status(200).json({
                error: false,
                msg: 'Booking Successful'
            });
        }).catch((err) => next(err));
}

const cancelAppointment = (req, res, next) => {
    appointmentModel.update({ _id: req.body.appointment_id }, {
            $set: {
                "status": "Cancelled"
            }
        })
        .then((appoinment) => {
            res.status(200).json({
                error: false,
                msg: 'Cancellation Successful'
            });
        }).catch((err) => next(err));
}

module.exports = {
    makeAppointment,
    cancelAppointment,
}