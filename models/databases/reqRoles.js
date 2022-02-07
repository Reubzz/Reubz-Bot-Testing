const mongoose = require("mongoose");

const reqRoles = new mongoose.Schema({
    gid: { type: String },
    commandName: { type: String },
    reqRoles: { type: Array }
})

module.exports = mongoose.model('Req-Roles', reqRoles)