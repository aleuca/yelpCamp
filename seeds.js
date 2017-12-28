let mongoose = require("mongoose");
let Campground = require("./models/campgrounds");
let Comment = require("./models/comment");
let data = [
    {
        name: "Cloud's Rest",
        image: "https://static1.squarespace.com/static/55ecd96fe4b0cee523072594/t/5734037a4c2f8582b5859ecd/1463026556921/FlashCamp_HR0075.jpg?format=1500w",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },

    {
        name: "Desert Mesa",
        image: "https://www.google.az/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi5ibe-rqzYAhUJshQKHeV1BEIQjBwIBA&url=http%3A%2F%2Fvisitmckenzieriver.com%2Foregon%2Fwp-content%2Fuploads%2F2015%2F06%2Fparadise_campground.jpg&psig=AOvVaw1S_u9H3bFgOaTVfFn1MqbT&ust=1514538702892647",
        description: "Lovely camp under the couds"
    },

    {
        name: "Singles' Peak",
        image: "https://static1.squarespace.com/static/55ecd96fe4b0cee523072594/t/5734037a4c2f8582b5859ecd/1463026556921/FlashCamp_HR0075.jpg?format=1500w",
        description: "Lovely camp under the couds"
    }
]


function seed() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("remove campgrounds");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added");
                    // create comment
                    Comment.create(
                    {
                        text:"this place is great but I wish there were wifi",
                        author: "Homer"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("createdcomment");
                        }
                    })
                }
            });
        })
    });
    // add a fw campgrounds
};

module.exports = seed;
