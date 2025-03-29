const db = require('mongoose');

const userSchema = new db.Schema({
    login: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true, minLength: 8},
    role: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const User = db.model('User', userSchema);
module.exports = User;