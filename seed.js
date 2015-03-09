var async = require('async');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/stackStore").connection;

require('./server/db/models/orders.js');
require('./server/db/models/reviews.js');
require('./server/db/models/sandwich.js');
require('./server/db/models/user.js');

var Review = mongoose.model("Reviews");
var Sandwich = mongoose.model("Sandwich");
var User = mongoose.model("User");

var data = {
    Sandwich: [
        {name: 'Awesomeness', description: 'This sandwich consists of super tasty ingredients ', price: 10.5, bread : 'Brioche' , fillings : ['Turkey','Brie', 'Apples'] },
        {name: 'The Elvis', description: 'Bacon, peanut butter, bananas. Yum!', price: 8, bread : 'Multigrain' , fillings : ['Peanut Butter', 'Bananas', 'Bacon'] },
        {name: 'Roast Beef and Cheese', description: 'Roast beef and cheddar', price: 8, bread : 'Wheat' , fillings : ['Roast Beef', 'Cheddar'] },
        {name: 'PB&J', description: 'Classic combo', price: 6, bread : 'Multigrain' , fillings : ['Peanut Butter', "Jelly"] },
        {name: 'Tree Hugger', description: 'Meatless but still delicious', price: 6, bread : 'Baguette' , fillings : ['Avocado','Pepper Jack','Lettuce','Tomato','Mayonnaise'] },
        {name: "Piggin' Out", description: 'Ham on a pretzel roll', price: 7.5, bread : 'Pretzel Roll' , fillings : ['Ham','Swiss','Mustard','Lettuce'], image: 'http://johnmichaeldemarco.com/wp-content/uploads/2014/12/ham-sandwich.jpg' }
    ],
    Review: [
        {description: "This sandwich is delicious! Highly recommended", stars: 5},
        {description: "Whoever came up with this sandwich was out of their mind! Gross", stars: 1},
        {description: "This was okay. Nothing super special but decent", stars: 3},
        {description: "I enjoyed this sandwich a lot! I wish it had more texture but it was pretty good", stars: 4},
        {description: "This was pretty tasty and I enjoyed it a lot. Get ittt", stars: 5},
        {description: "This was a great sandwich. The ingredients complemented each other nicely and I would order it again.", stars: 4},
    ],
    User: [
        { firstName: 'Kimmy', lastName: 'Schmidt', email: 'kimmy@email.com', password: 'kimmy' },
        { firstName: 'Titus', lastName: 'Andromedon', email: 'titus@email.com', password: 'titus', admin: true},
    ]
}

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
    console.log("Adding Data");

    async.each(data.User, function (user,userCreated) {
        User.create(user, userCreated);
    });

    async.each(data.Sandwich, function (sandwich,sandwichCreated) {
        Sandwich.create(sandwich, sandwichCreated);
    },function (err){
        console.log("Finished Adding Sandwiches");
        var i = 0;
        Sandwich.find({ } , function (err, sandwiches){
            async.each(data.Review, function (review, reviewCreated){
                review.sandwich = sandwiches[i]._id;
                Review.create(review, reviewCreated);
                i++;
            }, function (err){
                var j = 0;
                Review.find( {} , function (err, addedReviews) {
                    async.each(addedReviews, function(addedReview, refAdded) {
                        Sandwich.findOne( {_id: addedReview.sandwich}, function (err, addedSandwich) {
                            addedSandwich.reviews.push(addedReview._id);
                            addedSandwich.save( function() {
                                 refAdded();
                            });
                        });
                    }, function (err) {
                        if (err) console.log(err);
                        console.log("Finished With Reviews");
                        console.log("All done. Control-C to exit.");
                    })

                })

            });
        });
    });
    });
});
