const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;