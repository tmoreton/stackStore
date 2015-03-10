'use strict';
var router = require('express').Router();
var Sandwich = require('../../db/models/sandwich.js').Sandwich;
var User = require('../../db/models/user.js').User;
var Reviews = require('../../db/models/reviews.js').Reviews;
var Order = require('../../db/models/orders.js').Order;
var stripe = require("stripe")("sk_test_Gh9YI83NtqAns36ZNROjSaVs");

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
  var stripeToken = req.body.token;
  var price = req.body.total;


  var charge = stripe.charges.create({
    amount: price*100, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "sandwich stack payment. thank you!"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
    console.log('charge????', charge);
    res.send("completed payment!");
  });
});


module.exports = router;
