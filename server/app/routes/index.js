'use strict';
var router = require('express').Router();
var Sandwich = require('../../db/models/sandwich.js').Sandwich;
var User = require('../../db/models/user.js').User;
var Order = require('../../db/models/orders.js').Order;
var stripe = require("stripe")("pk_test_OxISGD7GxGhZCOofus3QFoW8");

// router.use('/', require('./'));

//get all sandwiches
router.get('/sandwiches', function(req, res) {
	Sandwich.find({}, function(err, sandwiches) {
		if(err) res.send(err)
			res.json(sandwiches);
	})
})

//post sandwiches
router.post('/sandwiches', function(req, res) {
	var sandwichData = req.body.sandwich;
	Sandwich.create(sandwichData).then(function(err, sandwich) {
    if (err) {
      res.send(err).end();
    }
		res.json(sandwich);
	})
})

router.delete('/sandwiches/:id', function(req, res) {
  Sandwich.remove({
    _id: req.params.id
  }, function(err, sandwich) {
    console.log('laksdjfla;kdjf;akdsj', req.params.id);
    if(err) res.send(err);

    Sandwich.find(function(err, sandwiches) {
      if(err) res.send(err)
        res.json(sandwiches);
    })


  })
})

router.post('/signup/', function(req, res){
  console.log(req.body.firstName)
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  }).then(function(){
    console.log("Got this far!")
    res.status(200).end();
  })
});
router.post('/orders', function(req, res){
  console.log("this is req.body or so we thought", req.body)
  Order.create({sandwiches:req.body.sandwiches, user:req.body.user}).then(function(order){
    console.log("order has been created");
    console.log("this should be a user damnit", req.body.user)
    User.findById(req.body.user, function(err, userDoc){
      console.log("inside user function")
      if (err){
        console.log(err)
      }else{
        console.log("trying to update user")
        userDoc.orders.push(order);
        userDoc.save(function(){
          res.status(200).end();
        });
      }
    });
  })
})
router.post('/build', function(req, res){
  console.log(req.body)
  // Order.create({
  //   firstName: req.body.firstName,
  // }).then(function(){
  //   console.log("Got this far!")
  //   res.status(200).end();
  // })
  // stripe.charges.create({
  //   amount: 400,
  //   currency: "usd",
  //   source: "tok_15d5BIHPOjExPGadYjdNe1ig", // obtained with Stripe.js
  //   metadata: {'order_id': '6735'}
  // });
});

module.exports = router;
