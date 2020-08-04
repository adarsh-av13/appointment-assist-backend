const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    consultant_id: String,
    date: Date,
    count: Number
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;