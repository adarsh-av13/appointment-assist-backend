const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    consultant_id: String,
    first_name: String,
    last_name: String,
    email: String,
    phone_no: String,
    token_no: Number,
    date: Date,
    status: String
}, {
    timestamps: true,
});

const appointmentModel = mongoose.model('Appointment', appointmentSchema);
module.exports = appointmentModel;