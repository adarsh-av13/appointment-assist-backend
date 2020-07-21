const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    hashpwd: String,
    salt: String,
    role: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;