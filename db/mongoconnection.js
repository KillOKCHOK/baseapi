

const mongoose = require('mongoose');


  let user = process.env.RDSUSER;
  let host = process.env.RDShost;
  let database = process.env.RDSDATABASE;
  let password = process.env.RDSPASSWORD;
  let port = process.env.RDSPORT;


const url = host + database;

mongoose.connect(url)
.then(() => {
  console.log("Connected To DB Sucessfully....")
})
.catch((err) => {
  console.log(err)
});

const connection = mongoose.connection;

connection.on('open', ()=>{
    console.log(' connected to mongodb')
})

module.exports = connection;