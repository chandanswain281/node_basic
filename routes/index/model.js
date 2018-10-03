var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: 'string',
    lname: 'string',
});

module.exports = mongoose.model('test', schema);