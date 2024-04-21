const Schema = require('mongoose').Schema;
const db = require('../db.config.js');

const MA01 = db.model('MA01', {
  name: String,
  enabled: Boolean,
  creationDate: Date,
  userName: String,
  tempLow: Number,
  tempHigh: Number,
  powerMax: Number,
});

module.exports = MA01;
