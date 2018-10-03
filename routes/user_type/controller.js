'use strict'

const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');

module.exports = {
    /*
    /---------------------------ROOT LEVEL-----------------
    */
    getAll: async (req, res, next) => {
        try {
            let data = await Service.getAll();
            apiResponse.sendJson(req, res, 200, "test", data);
        } catch (err) {
            next(err);
        }
    },
    save: async (req, res, next) => {
        let objectToSave = {}
        const body = req.body;
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                objectToSave[key] = body[key];
            }
        }
        objectToSave['type'] = body.type;
        objectToSave['user_role'] = body.user_role;

        try {
            let data = await Service.save(objectToSave);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },
    updateAll: async (req, res, next) => {
        let updateObject = {
            name: 'mohit 2'
        }
        let searchObject = {
            name: "mohit"
        }
        try {
            let data = await Service.updateAll(searchObject, updateObject);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },
    patchUpdateAll: async (req, res, next) => {
        let updateObject = {
            name: 'mohit'
        }
        let searchObject = {
            name: "mohit 2"
        }
        try {
            let data = await Service.updateAll(searchObject, updateObject);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },
    deleteAll: async (req, res, next) => {
        let searchObject = {};

        const body = req.body;
        if (body) {
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    searchObject[key] = body[key];
                }
            }
        }
        try {
            let data = await Service.removeAll(searchObject);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: async (req, res, next) => {
        if (req.params.id == 'login') {
            //login user
            res.json("login")
        } else if (req.params.id == 'register') {
            //register user
            res.json("register")
        } else if (req.params.id == 'logout') {
            //logout user
        } else {
            let searchObject = {
                _id: req.params.id
            }
            if (common.isValidId(req.params.id)) {
                try {
                    let data = await Service.getById(req.params.id);
                    apiResponse.sendJson(req, res, 200, "test", data);
                } catch (err) {
                    next(err);
                }
            } else {
                next(new Error("Invalid object id"));
            }
        }
    },
    saveAtId: (req, res, next) => {

    },
    updateAtId: (req, res, next) => {

    },
    patchUpdateAtId: (req, res, next) => {

    },
    deleteAtId: (req, res, next) => {

    },
    /*
    /---------------------------ACTION LEVEL-----------------
    */
    getAction: (req, res, next) => {

    },
    saveAction: (req, res, next) => {

    },
    updateAction: (req, res, next) => {

    },
    patchUpdateAction: (req, res, next) => {

    },
    deleteAction: (req, res, next) => {

    }
}