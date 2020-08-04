const Appointment = require('../models/appointmentModel');
const Token = require('../models/tokenModel');

const makeAppointment = async(req, res, next) => {
    let newAppointment;
    let token = await Token.findOne({ consultant_id: req.body.consultant_id, date: req.body.date });
    if (token === null) {
        token = new Token({
            consultant_id: req.body.consultant_id,
            date: req.body.date,
            count: 0
        });
    }
    token.count++;
    try {
        newAppointment = await Appointment.create({
            consultant_id: req.body.consultant_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            token_no: token.count,
            date: req.body.date,
            status: 'pending'
        });
    } catch (err) {
        next(err);
    }

    newAppointment.save().then((appointment) => {
        token.save().then((token) => {
            res.status(200).json({
                error: false,
                msg: 'Booking Successful',
                ...appointment
            });
        }).catch((err) => next(err));
    }).catch((err) => next(err))
};

const cancelAppointment = async(req, res, next) => {
    let appointment;
    try {
        appointment = await Appointment.findById(req.params.id);
        appointment.status = 'cancelled';
    } catch (err) {
        next(err);
    }
    appointment.save()
        .then((_appointment) => {
            res.status(200).json({
                error: false,
                msg: 'Cancellation Successful'
            });
        }).catch((err) => next(err));
}

const getAppointmentsForConsultant = (req, res, next) => {
    Appointment.find({ consultant_id: req.params.id })
        .then((appointments) => {
            console.log(appointments);
            res.status(200).json(appointments);
        }).catch((err) => next(err));
}

module.exports = {
    makeAppointment,
    cancelAppointment,
    getAppointmentsForConsultant,
}