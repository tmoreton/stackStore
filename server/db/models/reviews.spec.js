var mongoose = require('mongoose'),
	chai = require('chai'),
	expect = chai.expect;

mongoose.createConnection('mongodb://localhost/testingModels');

var Reviews = require('./reviews').Reviews;


describe('Reviews Model', function() {

    beforeEach(function (done) {
        Reviews.remove({}, done);
    });


    describe('Validations', function() {
        var review;
        beforeEach(function () {
            review = new Reviews();
        });

        it('should err without description', function (done) {
            review.validate(function (err) {
                expect(err.errors).to.have.property('description');
                done();
            });
        });


    });




});

