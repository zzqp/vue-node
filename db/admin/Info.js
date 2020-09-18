const mongoose = require('mongoose')
const InfoSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  mobile:{
    type:String,
    required: true
  },
  people:{
    type:String
  },
  cost:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Cost'
  },
},{ timestamps:{
  createdAt:'created',
  updatedAt:'updated'
}})
module.exports = mongoose.model('Info',InfoSchema)