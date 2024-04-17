var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: [{ type: String }],
    isDeleted: { type: Boolean, default: false }
});

module.exports = new mongoose.model('user', userSchema);