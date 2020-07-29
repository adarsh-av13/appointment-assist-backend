const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    user_id: String,
    first_name: String,
    last_name: String,
    display_picture: String,
    phone_no: String,
    address: String,
    active_days: Array,
    start_time: Date,
    end_time: Date,
});

const Consultant = mongoose.model('Consultant', consultantSchema);
module.exports = Consultant;