'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var product = require('./product.js');
var orders = require('./orders.js');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    admin: { type:Boolean, default: false },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {
        user.salt = generateSalt();
        user.password = encryptPassword(user.password, user.salt);
    }

    next();

});

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
