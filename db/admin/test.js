const mongoose = require('mongoose')
const timeSchema = new mongoose.Schema({
  time: {
    type:Date
  }
})
module.exports = mongoose.model('Time',timeSchema)