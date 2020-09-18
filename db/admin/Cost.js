const mongoose = require('mongoose')
const CostSchema = new mongoose.Schema({
  water: {
    type: Number,
    required: true
  },
  electricity: {
    type: Number,
    required: true
  },
  network:{
    type:Boolean,
  },
  room:{
    type:String
  },
  layer:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Layer'
  }
},{
  timestamps:{
    createdAt:'created',
    updatedAt:'updated'
  }
})
module.exports = mongoose.model('Cost',CostSchema)