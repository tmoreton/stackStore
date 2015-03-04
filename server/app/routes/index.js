'use strict';
var router = require('express').Router();
var Sandwich = require('../../db/models/sandwich.js').Sandwich;
var User = require('../../db/models/user.js').User;
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
	Sandwich.create(sandwichData).then(function(err) {
    if (err) {
      res.send(err).end();
    }
		res.status(200).end();
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



module.exports = router;
