const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    user_id: String,
    first_name: String,
    last_name: String,
    display_picture: String,
    phone_no: String,
    address: String,
    days_active: Array,
    slots: Number,
    start_time: Array,
    end_time: Array
});

const Consultant = mongoose.model('Consultant', consultantSchema);
module.exports = Consultant;