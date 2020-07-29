const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    hashpwd: String,
    role: String,
    profile_setup: Boolean
});

const User = mongoose.model('User', userSchema);
module.exports = User;