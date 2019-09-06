var express = require('express');
var router = express.Router();
//require the auth
var auth = require("../modules/auth");
//requring the jwt token
var UserModel = require("../model/users")
//handling the route for login
router.post("/",(req,res,next) => {
  var password = req.body.password;
  UserModel.findOne({email:req.body.email},(err,user) => {
    if(err) return next(err);
    if(!user) res.send("userNotFound");
    if(!user.confirmPassword(password)) res.send("noUser");
    var token = auth.generateToken({userid: user._id})
    res.json({token})
  })
})
//protected route
router.get("/users",auth.verifyToken,(req,res) => {
 UserModel.find({},(err,users) => {
   if(err) res.json({Eoor:ErrorFounded})
   res.json({users:users})
 })
})

//exporting the model
module.exports = router;
