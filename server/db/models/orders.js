var mongoose = require('mongoose');
var Product = require('./sandwich.js');

var schema = new mongoose.Schema({
    sandwiches: [{type: mongoose.Schema.Types.ObjectId, ref: "Sandwich"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
}); 

var Order = mongoose.model('Orders', schema);

module.exports = {
    Order: Order
    // OrderSchema: schema
};
