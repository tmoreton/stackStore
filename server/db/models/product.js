var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
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
        required: true,
        get: getPrice,
        set: setPrice
    },
    image: {
        url: String
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

var Product = mongoose.model('Product', schema);

module.exports = {
    Product: Product,
    productSchema: schema
};
