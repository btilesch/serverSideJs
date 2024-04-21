const Schema = require('mongoose').Schema;
const db = require('../db.config.js');

const Line = db.model('Line', {
  name: String,
  enabled: Boolean,
  creationDate: Date,
  userName: String,
  _ma01: {
    type: Schema.Types.ObjectId,
    ref: 'MA01',
  },
  _ma02: {
    type: Schema.Types.ObjectId,
    ref: 'MA02',
  },
});

module.exports = Line;
