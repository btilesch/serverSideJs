const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory').then((r) => console.log('Database connected'));

module.exports = mongoose;
