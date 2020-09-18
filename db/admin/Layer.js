const mongoose = require('mongoose')

const LayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Layer' }
})


module.exports = mongoose.model('Layer', LayerSchema)