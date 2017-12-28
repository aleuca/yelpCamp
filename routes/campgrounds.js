let express = require("express");
let router = express.Router();
let Campground = require("../models/campgrounds");
let Comment = require("../models/comment");


// show form to create new campground
router.get("/new", isLoggedIn,  function(req, res) {
    res.render("campgrounds/new");
});

// show campground lists
router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});


// create new campground in database
router.post("/", isLoggedIn, function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreatedCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreatedCampground);
            res.redirect("/campgrounds");
        }
    });
});

// shows more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// EDIT CAMPGROUND ROUTE

router.get("/:id/edit", checkCampgroundOwner,  function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        // does the user own the campground?
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id", checkCampgroundOwner, function(req, res) {
    // find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    // redirect somewhere(show page)
});


router.delete("/:id", checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


function checkCampgroundOwner(req, res, next) {
    if (req.isAuthenticated()) {
        // is user logged in
        // if not redirect
        // if yes they can run this code
            Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                    res.redirect("back");
                } else {
                    // does the user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else {
            res.redirect("back");
        }
}

module.exports = router;