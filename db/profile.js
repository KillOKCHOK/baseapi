const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
    name: {
    type:String,
    required:false
  }, 
    surname: {
      type:String,
      required:false
  }, 
    city:{
      type:String,
      required:false
    },
    phone:{
      type:String,
      required:false
    }
})

module.exports = mongoose.model('Profile', profileSchema);