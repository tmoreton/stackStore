'use strict';
var router = require('express').Router();
var Sandwich = require('../../db/models/sandwich.js').Sandwich;
var User = require('../../db/models/user.js').User;
var Reviews = require('../../db/models/reviews.js').Reviews;
var Order = require('../../db/models/orders.js').Order;
var stripe = require("stripe")("sk_test_Cv1UxGFrtA7dBCrUWstCn5sA");
var _ = require('lodash');
// router.use('/', require('./'));

//get all reviews or review of sandwich ID specified
router.get('/reviews', function(req, res){
    if(!req.body.params) {
      Reviews.find().populate('sandwich').exec(function(err, reviews) {
        if(err) {
          res.send(err);
        }
        res.json(reviews);  
     });
    }
});

//get sandwichbyid
router.get('/sandwiches/:id', function(req, res) {
    Sandwich.findById(req.params.id, function(err, sandwich){
      if(err) res.send(err);
        res.json(sandwich);
    });

});

//get all sandwiches
router.get('/sandwiches', function(req, res){
  Sandwich.find().populate('reviews').exec( function(err, sandwiches) {
    if(err) res.send(err);
    res.json(sandwiches);
  });
});


//post sandwiches
router.post('/sandwiches/', function(req, res) {
	var sandwichData = req.body.sandwich;
	Sandwich.create(sandwichData).then(function(err, sandwich) {
    if (err) {
      res.send(err).end();
    }
		res.json(sandwich);
	});
});


router.delete('/sandwiches/:id', function(req, res) {
  Sandwich.remove({
    _id: req.params.id
  }, function(err, sandwich) {
    if(err) res.send(err);

    Sandwich.find(function(err, sandwiches) {
      if(err) res.send(err);
        res.json(sandwiches);
    });
  });
});

router.put('/sandwiches/:id', function(req, res) {
  Sandwich.findById(req.params.id, function(err, sandwich) {
    if(err) res.send(err);
    sandwich.price = req.body.params.price;

    sandwich.save(function(err) {
      if(err) res.send(err);
      res.json(sandwich);
    });
  });
});

router.post('/signup/', function(req, res){
  console.log(req.body.firstName);
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  }).then(function(person){
    console.log("Got this far!");
    res.status(200).end();
  });
});
router.post('/orders', function(req, res){
  console.log("this is req.body or so we thought", req.body);
  Order.create({sandwiches:req.body.sandwiches, user:req.body.user}).then(function(order){
    console.log("order has been created");
    console.log("this should be a user damnit", req.body.user);
    User.findById(req.body.user, function(err, userDoc){
      console.log("inside user function");
      if (err){
        console.log(err);
      }else{
        console.log("trying to update user");
        userDoc.orders.push(order);
        userDoc.save(function(){
          res.status(200).end();
        });
      }
    });
  });
});


router.post('/charge', function(req, res){
  var stripeToken = req.body.stripeToken;

    console.log("----------------------------req-------",req.body);

  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "payinguser@example.com"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log("line 113", JSON.stringify(err, null, 2));
    }
    // console.log(charge)
    res.send("completed payment!");
  });
});

// router.post('/charge', function(req, res, next) {
//    var total = parseInt(req.body.total);
//    console.log(req.body.token);
//    stripe.charges.create({
//        amount: req.body.total,
//        currency: "usd",
//        source: req.body.token,
//        description: req.body.manifest
//    }, function(err, charge) {
//        res.send('Charged! Details: ' + charge);
//    });
// });
router.get('/search', function(req, res){
  var matches = []
  //grabs search terms
  console.log("in back end")
  var words = req.query.words
  console.log("type", typeof words)
  console.log("words", words)
  if(typeof words == "string"){
    words = words.split()
  }

  //find all sandwiches
  Sandwich.find(function(err, sandwiches) {
    if(err) res.send(err);
    var allSandwiches = sandwiches
    //for each sandwich
    allSandwiches.forEach(function(sandwich){
      //check if there is a match within the sandwich
      
      Array.prototype.forEach.call(words,function(word){
        //searches fillings:
        var fillings = sandwich.fillings.map(function(word){return word.toLowerCase()})
        fillings.forEach(function(ingredient){
          if(ingredient.indexOf(word) > -1){
              //push matches to matches array
              matches.push(sandwich)
          }
        })
        //searches bread:
        var bread = sandwich.bread.toLowerCase()
        if(bread.indexOf(word) > -1){
          //push matches to matches array
          matches.push(sandwich)
        }
        //searches by name
        var name = sandwich.name.toLowerCase()
        if(name.indexOf(word) > -1){
          //push matches to matches array
          matches.push(sandwich)
        }
        //searches by description
        var description = sandwich.description.toLowerCase()
        if(description.indexOf(word) > -1){
          //push matches to matches array
          matches.push(sandwich)
        }
        
      })

    })
    var uniqueMatches = _.uniq(matches)  
    res.json(uniqueMatches);
    
  });
  // res.status(200).end();

})

module.exports = router;
