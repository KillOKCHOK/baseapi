// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs  lesson

 
//authorization header sample
//authorization : Bearer_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJlbWFpbCI6InN0ZXBhbnR5dHNleWtvQGdtYWlsLmNvbS5jb20iLCJkZXZpY2VUeXBlIjoiZGVza3RvcCIsImJyb3dzZXJOYW1lIjoiQ2hyb21lIiwicGxhdGZvcm1OYW1lIjoiV2luZG93cyAxMCBob21lIGVkaXRpb24iLCJpYXQiOjE2NjY4ODU4MjIsImV4cCI6MTY2Njg4OTQyMn0.B9bQPVhDbhnyRoilillFPvgelp7L2qLkdohwpgfqE6M



const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  console.log("//////////////////authHeader///////////////////");
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader.substring(7,authHeader.length);
  // console.log(token);
  // console.log(req.headers);
  console.log("//////////////////token///////////////////");
  console.log(token);
    if (token == null) return res.sendStatus(401);
    
    else jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        // console.log(req)
        console.log(err)

        if (err) return res.status(403).send('Access denied');

        req.user = user

        next()
    })
}

module.exports = authenticateToken;