'use strict';
var router = require('express').Router();
var Sandwich = require('../../db/models/sandwich.js').Sandwich;
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

	var sandwichData = req.body;
	
	Sandwich.create(sandwichData).then(function() {
		res.status(200).end();
	})
})




module.exports = router;
