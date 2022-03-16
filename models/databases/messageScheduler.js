const mongoose = require('mongoose')

const scheduledSchema = new mongoose.Schema({
  date: { type: Date },
  content: { type: String },
  guildId: { type: String },
  channelId: { type: String },
  specialId: { type: String }
})

module.exports = mongoose.model('scheduled-message', scheduledSchema)