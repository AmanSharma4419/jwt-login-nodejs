//requring the token
var jwt = require("jsonwebtoken");
//generating the middleware for token generating
module.exports.generateToken = function(payload) {
  return jwt.sign(payload,"abcdef")
} 
//generating the verify middleware
module.exports.verifyToken = function(req,res,next) {
    var token = req.headers.authorization || "";
    if(token) {
        jwt.verify(token,"abcdef",(err,decoded) => {
           // console.log(decoded)
            if(err) res.json({ token:"notVerify"})
            next();
        });
    } else {
        return res.json({token:"notFound"})
    }
};


