const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/b8upop').then((r) => console.log('Database connected'));

module.exports = mongoose;
