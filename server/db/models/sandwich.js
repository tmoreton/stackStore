var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var reviews = require('./reviews.js');
var uniqueValidator = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    image: String,
    bread: {
        type: String,
        required: true,
    },
    fillings: [String],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Reviews"}]
    // id: {
    //     type: String,
    //     unique: true
    // }
});


schema.plugin(uniqueValidator);
var Sandwich = mongoose.model('Sandwich', schema);

module.exports = {
    Sandwich: Sandwich,
};
