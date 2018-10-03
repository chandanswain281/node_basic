var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user_type: {
        type: mongoose.Schema.Types.String,
        default: "USER",
        enum: ["USER", "ADMIN", "SYSTEM"]
    },
    status: {
        type: mongoose.Schema.Types.Number,
        default: 1
    },
    user_role: {
        type: mongoose.Schema.Types.Number,
        enum:[0,1,2,3],
        default: 0 //0 -> read only, 1 -> write, 2 -> edit, 3 -> delete
    },
    sort_order: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    added_date: {
        type: mongoose.Schema.Types.Date
    }
});

module.exports = mongoose.model('UserTypes', schema);