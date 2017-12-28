let express = require("express"),
    app = express(),
    parser = require("body-parser"),
    mongoose = require("mongoose");
    Campground = require("./models/campgrounds");
    seed = require("./seeds");

seed();
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(parser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function (req, res) {
    res.render("landing");
});

// show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// show campground lists
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});


// create new campground in database
app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreatedCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreatedCampground);
        }
    });
    res.redirect("/campgrounds");
});

// shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("server running");
});