const mongoose = require("mongoose");

const suggestions = new mongoose.Schema({
    user: { type: String },
    gid: { type: String },
    sugTitle: { type: String },
    sugDesc: { type: String },
    specialId: { type: String },
    messageId: { type: String }
})

module.exports = mongoose.model('suggestion', suggestions)