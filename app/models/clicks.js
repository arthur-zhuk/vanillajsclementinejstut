'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Click = new Schema(
  { clicks: Number },
  { versionKey: false },
  { comments: String }
);

module.exports = mongoose.model('Click', Click);
