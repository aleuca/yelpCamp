let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;


let UserSchema = mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);