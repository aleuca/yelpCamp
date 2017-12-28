let mongoose = require("mongoose");
mongoose.Promise = global.Promise;


let commentSchema = mongoose.Schema({
    text: String,
    author: String
})


module.exports = mongoose.model("Comment", commentSchema);