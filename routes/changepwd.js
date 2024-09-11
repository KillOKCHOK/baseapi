var express = require('express');
var router = express.Router();
const Account = require("../db/account");
var crypto = require( 'crypto')
const jwt = require('jsonwebtoken');

router.post('/', async function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.substring(7,authHeader.length);
    let { userId,login} = req.body;
    var decoded = jwt.decode(token, {complete: true});
    if (decoded.payload.userId!=userId || decoded.payload.login!=login){
        const error = Error("Wrong details please check one more time");
        res.status(error.status || 403);
        res.json({
        message: error.message,
        error: error
        });
    }else{
        try{
            account = (await Account.find({login:login}))[0];
            account.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
            await account.save();
            res.send("password updated successfully")
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
});

module.exports = router;