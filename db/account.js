const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
  login: {
    type:String,
    required:true
  }, 
    password: {
      type:String,
      required:true
  },  
    activated: {
      type:Boolean,
      required:true
  }, 
    role:{
      type:String,
      required:false
    }
})


module.exports = mongoose.model('Account', accountSchema);
      