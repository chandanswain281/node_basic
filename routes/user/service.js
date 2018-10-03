'use strict'

const Model = require('./model');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');
const _ = require('underscore');

module.exports = {
    /*
    /---------------------------ROOT LEVEL-----------------
    */
    save: (dataForSaving) => {
        if (!_.isEmpty(dataForSaving)) {
            dataForSaving._id = new mongoose.Types.ObjectId();
            let model = new Model(dataForSaving);
            return new Promise((resolve, reject) => {
                model
                    .save()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Data to save can not be empty"));
            })
        }
    },
    getAll: (searchObject, filteredData) => {
        return new Promise((resolve, reject) => {
            Model
                .find(searchObject, filteredData)
                .exec()
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    updateAll: (searchObject, updateObject) => {
        return new Promise((resolve, reject) => {
            Model
                .updateMany(searchObject, updateObject)
                .exec()
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    removeAll: (searchObject) => {
        return new Promise((resolve, reject) => {
            Model
                .remove(searchObject)
                .exec()
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: (searchObject, filteredData) => {
        return new Promise((resolve, reject) => {
            Model
                .findById(searchObject, filteredData)
                .exec()
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
}