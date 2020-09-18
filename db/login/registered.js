const mongoose = require('mongoose')
const registeredShema = new mongoose.Schema({
  user:{type:String},
  password:{
    type:String,
    set(val){
      return require('bcrypt').hashSync(val,10)
  }}
})
module.exports = mongoose.model('Registered',registeredShema)