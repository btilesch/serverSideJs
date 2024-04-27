const db = require('../db.config.js');

const MA02 = db.model('MA02', {
  name: String,
  enabled: Boolean,
  creationDate: Date,
  username: String,
  pressureA: Number,
  pressureB: Number,
  pressureAlm: Number,
});

module.exports = MA02;
