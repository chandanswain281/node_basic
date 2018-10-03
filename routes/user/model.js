var mongoose = require('mongoose');

var user_extra_details = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    addresses: [{
        zip_code: {
            type: mongoose.Schema.Types.Number
        },
        state: {
            type: mongoose.Schema.Types.String,
            default: null
        },
        city: {
            type: mongoose.Schema.Types.String,
            default: null
        },
        area: {
            type: mongoose.Schema.Types.String,
            default: null
        },
        locality: {
            type: mongoose.Schema.Types.String,
            default: null
        },
        country: {
            type: mongoose.Schema.Types.String,
            default: "IN"
        },
        home_address: {
            type: mongoose.Schema.Types.String,
            default: null
        },
        address_type: {
            type: mongoose.Schema.Types.String,
            enum: ["HOME", "OFFICE"],
            default: "HOME"
        },
        default_status: {
            type: mongoose.Schema.Types.Number,
            default: 1
        }
    }]
});

var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    first_name: {
        type: mongoose.Schema.Types.String,
    },
    last_name: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    status: {
        type: mongoose.Schema.Types.Number,
        default: 1
    },
    phone_verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    email_verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    delete_status: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    user_type: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'UserTypes'
    },
    added_date: {
        type: mongoose.Schema.Types.Date
    },
    extra_details: {
        type: user_extra_details
    }
});

module.exports = mongoose.model('Users', schema);