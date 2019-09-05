var express = require('express');
var router = express.Router();
//requring the model
var UserModel = require("../model/users")
//handling the registration route
router.post("/",(req,res) => {
  UserModel.create(req.body,(err,user) => {
    if(err) console.log("error while saving into database");
    res.send("saved into database")
  })
})

//exporting the router
module.exports = router;
