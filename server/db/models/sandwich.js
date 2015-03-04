var mongoose = require('mongoose');

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
        //required: true,
        get: getPrice,
        set: setPrice
    },
    image: {
        url: String
    },
    fillings: [String],
    bread: {
        type: String,
        required: true,
    }
    // id: {
    //     type: String,
    //     unique: true
    // }
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

var Sandwich = mongoose.model('Sandwich', schema);

module.exports = {
    Sandwich: Sandwich,
    sandwichSchema: schema
};
