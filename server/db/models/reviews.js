var mongoose = require('mongoose');
var Sandwich = require('./sandwich.js');
var User = require('./user.js');

var schema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  sandwich: {type: mongoose.Schema.Types.ObjectId, ref: "Sandwich"},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  stars: {type: Number, min: 1, max: 5}
});

var Reviews = mongoose.model('Reviews', schema);


module.exports = {
	Reviews: Reviews
};