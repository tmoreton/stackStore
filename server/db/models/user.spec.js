var mongoose = require('mongoose'),
	chai = require('chai'),
	expect = chai.expect;

mongoose.connect('mongodb://localhost/testingModels');

var User = require('./user').User;
var Orders = require('./orders').Orders;
console.log('are we calling this?', User);

describe('User Model', function() {

    beforeEach(function (done) {
        User.remove({}, done);
    });

    describe('Validations', function() {
        var user;
        beforeEach(function () {
            user = new User();
        });

        it('should err without first name and last name', function (done) {
            user.validate(function (err) {
                expect(err.errors).to.have.property('firstName');
                expect(err.errors).to.have.property('lastName');
                done();
            });
        });

		it('should err without email and password', function (done) {
            user.validate(function (err) {
                expect(err.errors).to.have.property('email');
                expect(err.errors).to.have.property('password');
                done();
            });
        });

    });

    describe('unique email', function() {
    	var user1;
		beforeEach(function(done) {
			User.create({
				firstName: 'Timmy',
				lastName: 'Turner',
				email: 'timmyturner@dimmsdale.com',
				password: 'trixietang'
			}, function(err, createdUser) {
				user1 = createdUser;
				done()
			});
		});

		it('should return error with invalid email', function(done) {
				User.create({
					firstName: 'Spongebob',
					lastName: 'Squarepants',
					email: 'timmyturner@dimmsdale.com',
					password: 'bikinibottom'
				}, function(err, createdUser2) {
					console.log('testing err', err);
						expect(err.errors).to.have.property('email');
						done();		
				})
		})


    })

    describe('correctPassword method', function() {
		var user;
		beforeEach(function(done) {
			User.create({
				firstName: 'Timmy',
				lastName: 'Turner',
				email: 'timmyturner@dimmsdale.com',
				password: 'trixietang'
			}, function(err, createdUser) {
				user = createdUser;
				done()
			});
		});


		it('returns true given a user\'s true password', function() {
			expect(user.correctPassword('trixietang')).to.equal(true);
		});


    })
});

