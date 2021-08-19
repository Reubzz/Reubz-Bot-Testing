const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const scheduledSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  content: reqString,
  guildId: reqString,
  channelId: reqString
})

const name = 'schedule-message-beta'

module.exports = mongoose.model[name] || mongoose.model(name, scheduledSchema, name)