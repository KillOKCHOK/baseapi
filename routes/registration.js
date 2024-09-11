var express = require('express');
var router = express.Router();
const accountSchema = require("../db/account");
const profileSchema = require("../db/profile");
var crypto = require( 'crypto')


/* GET users listing. */
router.get('/', function(req, res, next) {
  var hash = crypto.createHash('sha256').update('mystring').digest('hex');

  console.log(hash);
  res.send(hash);
});

router.post('/', async function(req, res, next) {
  if (req.body.login){
    let account = await accountSchema.find({login:req.body.login});
    if(account[0]){
      const error = new Error("Error! Account exists");
      res.status(409).send(error);
    }else{
      var hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
      const user = new accountSchema({
        login: req.body.login, 
        password: hash,  
        activated: true, 
        role: "USER"
      })
      let result = await user.save();
      // console.log(result._id.toHexString());
      try{
        const profile = new profileSchema({
              userId : result._id.toHexString(),  
              name : "",
              surname : "",
              phone : "",
              city : ""
          // date : req.body.date
        })
        profile.save();
        res.send({message:"Registration successful"});
      }catch (error){
        res.status(403).send('Was not able to create profile');
      }
    }
  }else{
    res.send("Please enter valid email");
  }
});

module.exports = router;
