var mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: Number,  
    isDeleted: { type: Boolean, default: false }
});

module.exports = new mongoose.model('student', studentSchema);