var Order   = require('../../db/models/orders.js');
var Users   = require('../../db/models/user.js');
var Sandwich   = require('../../db/models/sandwich.js');
var stripe = require("stripe")(config.param("pk_test_OxISGD7GxGhZCOofus3QFoW8"));
var mongoose  = require('mongoose');

exports.create = function create(req, res, next) {
  console.log('Create Order');

  var newCharge = {
    amount: req.body.price,
    currency: config.param('stripe_currency'),
    card: req.body.stripe_token
  }

  stripe.charges.create(newCharge, function capture(err, response) {

    if(err || !response) {
      res.send({err: 'invoice not created'}, 409);
      return;
    }

    // var newInvoice = {
    //   client: req.body.client,
    //   ebook: req.body.ebook,
    //   date: new Date()
    // };

    Order.create(newInvoice, function (err, invoice) {

      if(err || !invoice) {
        res.send({err: 'invoice not created'}, 409);
        return;
      }


      res.send(invoice);
    });
  });
};
