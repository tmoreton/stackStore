var mongoose = require('mongoose');
var Product = require('./product.js');
var User = require('./user.js')

var schema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  product: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
  user: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

mongoose.model('Reviews', schema);
