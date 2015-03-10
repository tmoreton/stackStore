'use strict';
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
        {name: "Piggin' Out", description: 'Ham on a pretzel roll', price: 7.5, bread : 'Pretzel Roll' , fillings : ['Ham','Swiss','Mustard','Lettuce'], image: 'http://johnmichaeldemarco.com/wp-content/uploads/2014/12/ham-sandwich.jpg' },
        {name: "The Wicked", description: 'Five meats, three cheeses', price: 9, bread : 'Pumpernickel' , fillings : ['Turkey', 'Ham', 'Roast Beef', 'Pepperoni','Bacon', 'Provolone','Pepper Jack', 'Cheddar'], image: 'http://www.whichwich.com/img/menu/Bag-The-Wicked.jpg' },
        {name: "Club Sandwich", description: 'Deliciousness', price: 7, bread : 'Ciabatta' , fillings : ['Ham','Swiss','Mustard','Lettuce'], image: 'http://johnmichaeldemarco.com/wp-content/uploads/2014/12/ham-sandwich.jpg' },
        {name: "TAMmy", description: 'Tomato, Avocado, & Mayo', price: 5, bread : 'Wheat' , fillings : ['Tomato', 'Avocado', 'Mayonnaise'], image: 'http://4.bp.blogspot.com/-PND9dC-rjUs/T4wRQwMjE7I/AAAAAAAAAJs/YYWWYnUGlZA/s1600/ClubSandwich480.jpg' },
        {name: "Monte Cristo", description: 'Ham, Turkey, Jelly, and powdered sugar on top', price: 8, bread : 'Brioche' , fillings : ['Ham','Turkey','Jelly'] },
        {name: "Weirdness", description: 'Random stuff. Good when you have munchies. Maybe.', price: 8, bread : 'Pumpernickel' , fillings : ['Kale', 'Peanut Butter', 'Mustard', 'Chicken', 'Tomato','Portabello Mushroom', 'Bacon','Provolone','Bananas','Potato Chips']},
        {name: "Good for Animal Lovers", description: 'You will love this, we promise', price: 7, bread : 'Rye' , fillings : ['Portobello Mushhroom','Goat Cheese','Spinach','Tomato','Onions','Mayonnaise']},
        {name: "Sri-Brie", description: 'Brie with a little spicy kick', price: 6.5, bread : 'Brioche' , fillings : ['Brie','Sriracha'], image: 'http://houseofyumm.com/wp-content/uploads/2014/11/DSC_0245.jpg' },
        {name: "Italian", description: 'A blend of pepperoni and salami, topped with cheese', price: 7.5, bread : 'Ciabatta' , fillings : ['Ham','Salami','Lettuce','Mayonnaise','Bell Peppers'], image: 'http://johnmichaeldemarco.com/wp-content/uploads/2014/12/ham-sandwich.jpg' },
        {name: "Cheeeese", description: 'Lots of cheese.', price: 5.5, bread : 'White' , fillings : ['Brie','Swiss','Cheddar','Provolone','Pepper Jack'], image: 'http://savorsa.zippykid.netdna-cdn.com/wp-content/uploads/2013/06/Grilled-Cheese-TripleCream-Brie-Peach-Thyme-cropped.jpg' },
        {name: "Feelin' Good", description: 'Healthy but still delicious', price: 6, bread : 'Lettuce Wrap' , fillings : ['Spinach','Lettuce', 'Tomato','Bell Peppers'], image: 'http://www.kraftrecipes.com/assets/recipe_images/Cucumber_Ranch_Lettuce_Wrap.jpg' },
        {name: "BBB", description: 'Brie and bacon on brioche.', price: 6, bread : 'Brioche' , fillings : ['Brie','Bacon'], image: 'http://www.baxters.com/resource/uploads/generic/briebaconsmall.png' },
    ],
    Review: [
        {description: "This sandwich is delicious! Highly recommended", stars: 5},
        {description: "Whoever came up with this sandwich was out of their mind! Gross", stars: 1},
        {description: "This was okay. Nothing super special but decent", stars: 3},
        {description: "I enjoyed this sandwich a lot! I wish it had more texture but it was pretty good", stars: 4},
        {description: "This was pretty tasty and I enjoyed it a lot. Get ittt", stars: 5},
        {description: "Awesome", stars: 4},
        {description: "Blah. So terrible", stars: 1},
        {description: "Best sandwich I've ever had", stars: 5},
        {description: "Whatever. Ok I guess", stars: 3},
        {description: "Really good", stars: 4},
        {description: "Could have been a lot better", stars: 2},
        {description: "A little boring but fine", stars: 4},
        {description: "I would eat this every day", stars: 5},
        {description: "Horrible", stars: 1},
        {description: "Party in your mouth", stars: 5},
        {description: "Delicious", stars: 4},
        {description: "Not bad", stars: 3},
        {description: "Really fantastic", stars: 5},
        {description: "This was incredible", stars: 5},
        {description: "Almost as good as what my mom makes!", stars: 4},
        {description: "If I write good reviews do I get discounts?", stars: 4},
        {description: "Would have been better with some hot sauce", stars: 3},
        {description: "Kind of boring but okay I guess", stars: 2},
        {description: "Really, really, really delicious", stars: 5},
        {description: "Shrug. It was alright", stars: 3},
        {description: "Sandwiches are lame", stars: 1},
        {description: "Whoever made this sandwich is pure genius", stars: 5},
        {description: "This sandwich was a masterpiece", stars: 5},
        {description: "One of the best sandwiches I've ever eaten", stars: 5},
        {description: "Fun times", stars: 4},
        {description: "I could make a better sandwich but not bad", stars: 3},
        {description: "Are hamburgers sandwiches? Who knows.", stars: 4},
        {description: "This sandwich tasted like a sandwich", stars: 3},
        {description: "You would be dumb not to order this", stars: 5},
    ],
    User: [
        { firstName: 'Kimmy', lastName: 'Schmidt', email: 'kimmy@email.com', password: 'kimmy' },
        { firstName: 'Titus', lastName: 'Andromedon', email: 'titus@email.com', password: 'titus', admin: true},
    ]
};

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
                i=Math.floor(Math.random()*sandwiches.length);
                review.sandwich = sandwiches[i]._id;
                Review.create(review, reviewCreated);
            }, function (err){
                var j = 0;
                Review.find( {} , function (err, addedReviews) {
                    async.each(addedReviews, function(addedReview, refAdded) {
                        Sandwich.find( {_id: addedReview.sandwich}, function (err, addedSandwiches) {
                            async.each(addedSandwiches, function(sandwich,refAdded2) {
                                sandwich.reviews.push(addedReview._id);
                                sandwich.save( function() {
                                refAdded2();
                                });
                            refAdded();
                            });
                        });
                    }, function (err) {
                        if (err) console.log(err);
                        console.log("Finished With Reviews");
                        console.log("All done. Control-C to exit.");
                    });

                });

            });
        });
    });
    });
});
