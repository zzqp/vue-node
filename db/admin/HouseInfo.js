const mongoose = require('mongoose')
const HouseInfoSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  layer:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Layer'
  }
}, {
  timestamps:{
    createdAt: 'created',
    updatedAt: 'updated'
  }
})
module.exports = mongoose.model('HouseInfo',HouseInfoSchema)