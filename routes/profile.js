var express = require('express');
var router = express.Router();

const profileSchema = require('../db/profile')



/* GET boards listing. */
router.get('/:id', async function(req, res, next) {
  try {
    // let board = await userSchema.find({_id:req.params.id});
    let profile = await profileSchema.find({userId:req.params.id});
    console.log(profile);
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

/* POST board. */
router.post('/', async function(req, res, next) {
  console.log(req.body);
  const profile = new profileSchema({
        userId : req.body.userId,  
        name : req.body.name,
        surname : req.body.surname,
        phone : req.body.phone,
        city : req.body.city
    // date : req.body.date
  })
  try {
    let result = await profile.save();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

/* PATCH users . */
router.patch('/:id', async function(req, res, next) {
  try {
    const profile = await profileSchema.findById(req.params.id);
    console.log(profile);
    profile.userId = req.body.userId;  
    profile.name = req.body.name;
    profile.surname = req.body.surname;
    profile.phone = req.body.phone;
    profile.city = req.body.city ;
    let result = await profile.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

/* DELETE users . */
router.delete('/:id', async function(req, res, next) {
  try {
    // let user = await userSchema.findById(req.params.id);
    const result = await profileSchema.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
