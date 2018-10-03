'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config').config();
const _ = require('underscore');

module.exports = {
    generateSaltPass: (stringPassword) => {
        const salt = bcrypt.genSaltSync(10);
        const hashValue = bcrypt.hashSync(stringPassword, salt);
        return {
            "salt": salt,
            "hashValue": hashValue
        }
    },
    comparePassword: (stringPassword, hashedPassword) => {
        return bcrypt.compareSync(stringPassword, hashedPassword);
    },
    generateToken: (signingObject) => {
        let options = {};
        options.algorithm = 'HS256';
        options.expiresIn = 100000;
        options.audience = "WEB";
        options.issuer = "SERVER";

        if (_.isEmpty(signingObject)) {
            return null;
        }
        try {
            return jwt.sign(signingObject, config.SECRET_KEY, options)
        } catch (error) {
            return null;
        }
    },
    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(jwt.verify(token, config.SECRET_KEY));
            } catch (error) {
                reject(error);
            }
        });
    }
}

/*
console.log(
    module.exports.generateToken({
        role: "admin"
    })
)
*/

