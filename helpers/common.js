'use strict'
const moment = require('moment');
const mongoose = require('mongoose');

exports.isSame = (str1, str2) => {
    if (str1 && str2) {
        if (str1 == str2) return true;
        else return false;
    } else {
        return false;
    }
}
exports.currentDate = () => {
    return new moment();
}

exports.contentType = (content) => {
    if (content != undefined) {
        return typeof content;
    } else return null;
}

exports.isValidId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}