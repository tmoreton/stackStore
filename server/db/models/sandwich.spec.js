var mongoose = require('mongoose'),
	chai = require('chai'),
	expect = chai.expect;

mongoose.createConnection('mongodb://localhost/testingModels');

var Sandwich = require('./sandwich').Sandwich;
var Reviews = require('./reviews').Reviews;
var getPrice = require('./sandwich').getPrice;
var setPrice = require('./sandwich').setPrice;

console.log('are we calling the sandwich?', Sandwich);

describe('Sandwich Model', function() {

    beforeEach(function (done) {
        Sandwich.remove({}, done);
    });


    describe('Validations', function() {
        var sandwich;
        beforeEach(function () {
            sandwich = new Sandwich();
        });

        it('should err without name, description and bread', function (done) {
            sandwich.validate(function (err) {
                expect(err.errors).to.have.property('name');
                expect(err.errors).to.have.property('description');
                expect(err.errors).to.have.property('bread');
                done();
            });
        });


    });

    describe('name of sandwich should be unique', function() {
		var review = new Reviews({
			description: "an excellent sandwich"
		});
			review.save();

    	var sandwich;
		beforeEach(function(done) {
			Sandwich.create({
				name: 'The Crocker',
				description: 'a simple sandwich',
				price: 1000,
				fillings: ['apple', 'brie', 'goat cheese'],
				bread: 'brioche',
				reviews: [review._id]
			}, function(err, createdSandwich) {
				sandwich = createdSandwich;
				Sandwich.findOne({_id:createdSandwich.id}).populate('reviews')
					.exec(function(err, sandwich) {	
						done()
					})
			});
		});


			it('should return error with invalid sandwich name', function(done) {
					Sandwich.create({
						name: 'The Crocker',
						description: 'an emotional sandwich',
						bread: 'wheat',
					}, function(err, createdSandwich2) {
						console.log('testing err', err);
							expect(err.errors).to.have.property('name');
							done();		
					})
			})

});

	describe('getPrice and setPrice method', function() {
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

				it('should get price 15.00', function(done) {
					sandwich.price = 15;
					expect(sandwich.price).to.equal('15.00');
					done();
				})

				it('should set price', function(done) {
					sandwich.price = 15;
					expect(setPrice(sandwich.price)).to.equal(1500);
					done();
				})


		})



});

