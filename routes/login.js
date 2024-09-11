var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const Account = require("../db/account");
var crypto = require( 'crypto');

router.post("/", async function(req, res, next){
    // we receive pwd hashed and hash it one more time
    let { login, password } = req.body;
    let pwd = crypto.createHash('sha256').update(password).digest('hex');
    let existingUser;
    try {
        existingUser = (await Account.find({login:login}))[0];
    }catch {
        const error = new Error("Error! Something went wrong.");
        res.json({
            message: error.message,
            error: error
          });
    }
    if (!existingUser || existingUser.password != pwd) {
        const error = Error("Wrong details please check one more time");
        res.status(error.status || 500);
        res.json({
          message: error.message,
          error: error
        });
    }else{
        try {
            let finalTime = Math.round((new Date().getTime() + 30 * 24 * 60 * 60 * 1000 )/1000);
            res.status(200)
            .send({
                userId: existingUser._id,
                login: existingUser.login,
                role: existingUser.role,
                expiresInSeconds: finalTime-1,
                token: jwt.sign(
                { 
                    userId: existingUser._id, 
                    login: existingUser.login,
                    role: existingUser.role,
                    // deviceType: req.body.deviceType,
                    // browserName: req.body.browserName,
                    // platformName: req.body.platformName
                },
                process.env.TOKEN_SECRET,
                // { expiresIn: "30d" }
                { expiresIn: (finalTime-Math.round(new Date().getTime()/1000))+"s" }
                )
            });
        }catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            res.status(error.status || 500);
            res.json({
              message: error.message,
              error: error
            });
        }  
    } 
});

module.exports = router;