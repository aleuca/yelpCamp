let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: []
        }]
},
    {
        usePushEach: true
    });


module.exports = mongoose.model("Campground", campgroundSchema);