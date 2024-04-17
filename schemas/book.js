var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: Number,
    author: {
        //type: mongoose.Types.ObjectId,
        //ref: 'author'
        type: String, required: true

    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = new mongoose.model('book', bookSchema);