//require thr mongoose
var mongoose = require("mongoose")
//extracting the schema
var schema = mongoose.Schema;
//requring the bcrypt
var bcrypt = require("bcrypt")
//making the schema
var userSchema = new schema ({
    name:String,
    email: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required : true,
    }
},{timestamps : true})
//implementing the presave function
userSchema.pre("save",function(next) {
if(this.password) {
    this.password = bcrypt.hashSync(this.password,10);
    next();
}
});
//comparing the hash password with plane password
userSchema.methods.confirmPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}
//making the model of password
var User = mongoose.model("User",userSchema);
//exporting the model of schema
module.exports = User