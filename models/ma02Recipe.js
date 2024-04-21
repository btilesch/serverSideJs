const Schema = require('mongoose').Schema;
const db = require('../db.config.js');

const MA02 = db.model('MA02', {
  name: String,
  enabled: Boolean,
  creationDate: Date,
  userName: String,
  pressureA: Number,
  pressureB: Number,
  pressureAlm: Number,
});

module.exports = MA02;
