var express = require('express');
var router = express.Router();
//requring the jwt token
var jwt = require("jsonwebtoken");
//requring the model 
var UserModel = require("../model/users")
//handling the route for login
router.post("/",(req,res) => {
  var password = req.body.password;
  UserModel.findOne({email:req.body.email},(err,user) => {
    if(err) return next(err);
    if(!user) res.send("user not found");
    if(!user.confirmPassword(password)) res.send("no user");
    jwt.sign({userid: user.id},"abcdef",(err,token) => {
      res.json(token)
    })
  })
})

module.exports = router;
