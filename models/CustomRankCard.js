const mongoose = require("mongoose");

const customRankCard = new mongoose.Schema({
    user: { type: String },
    gid: { type: String },
    img: { type: String, default: 'https://i.imgur.com/EnPpetR.jpg' },
    lvlbar: { type: String, default: '#ffffff' }
})

module.exports = mongoose.model('Custom-Rank-Card', customRankCard)