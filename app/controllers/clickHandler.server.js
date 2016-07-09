'use strict'

var Users = require('../models/users.js');
//var bodyParser = require('body-parser');

function ClickHandler() {

  this.getClicks = function(req, res) {
    Users
      .findOne({ 'github.id': req.user.github.id }, { '_id': false })
      .exec(function (err, result) {
        if (err) { throw err; }

        res.json(result.nbrClicks);
      });
  };

  this.addClick = function (req, res) {
    Users
      .findOneAndUpdate({ 'github.id': req.user.github.id}, { $inc: { 'nbrClicks.clicks': 1 } })
        .exec(function (err, result) {
          if (err) { throw err; }
          res.json(result.nbrClicks);
        });
  };

  this.resetClicks = function (req, res) {
    Users
      .findOneAndUpdate({'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
        .exec(function (err, result) {
          if (err) { throw err; }
          res.json(result.nbrClicks);
        });
  };

  this.getComments = function (req, res) {
    Users.find({}, function(err, result) {
      if (err) { throw err; }
      if (result) {
        res.json(result);
      } else {
        Users.insert({ 'comments': "First Comment Test"}, function (err) {
          if (err) {
            throw err;
          }
          Users.findOne({}, function(err, doc) {
            if (err) { throw err; }
            res.json(doc);
          })
        })
      }
    })
  }

  this.addComment = function (req, res) {
    var cmntfrompage = req.body.commentArea;
    console.log(res.json(cmntfrompage));

    Users
      .findOneAndUpdate({ 'github.id': req.user.github.id}, { 'comments.comment': cmntfrompage })
          .exec(function (err, result) {
          if (err) { throw err; }
          res.json(result.comments);
        });
  };
}
module.exports = ClickHandler;
