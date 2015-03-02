var mongoose = require('mongoose');
var product = require('./product.js')

var schema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
});

var Order = mongoose.model('Orders', schema);

module.exports = {
    Order: Order,
    OrderSchema: schema
};
