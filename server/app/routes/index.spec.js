var Sandwich = require('../../db/models/sandwich.js').Sandwich;
var supertest = require('supertest');
var mongoose = require('mongoose');
var app = require('../../app/routes');
var agent = supertest.agent(app);
var expect = require('chai').expect;

mongoose.createConnection('mongodb://localhost/testingModels');

describe('Sandwiches route', function() {

	beforeEach(function(done){
		Sandwich.remove({}, done);
	})

	describe('GET /sandwiches', function() {
			var sandwich;
			beforeEach(function(done) {
				Sandwich.create({
					name: 'The Crocker',
					description: 'a simple sandwich',
					fillings: ['apple', 'brie', 'goat cheese'],
					bread: 'brioche'
				}, function(err, createdSandwich) {
					sandwich = createdSandwich;
					done()
				});
			});

		it('should respond with json', function (done) {
      		agent
      			.get('/sandwiches')
      			.set('Accept', 'application/json')
      			.expect('Content-Type', /json/)
      			.expect(200, done);
      	})

      describe ('POST to /sandwiches', function() {
      	it('should create sandwich in database', function(done) {
      		agent.post('/sandwiches')
      			.send({ 
      				name: 'New Sandwich',
      				description: 'a new kind of sandwich',
      				fillings: ['onions', 'roast beef', 'hummus'],
      				bread: 'white'
      		})
      			.end(function(err, response) {
      				Sandwich.find({name: 'New Sandwich'}, function(err, sandwiches) {
      					expect(sandwiches).to.have.lengthOf(1);
      					done();
      				})
      			})
      	})
      })
    });



});