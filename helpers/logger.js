const chalk = require('chalk');
const winston = require('winston');

const INFO_LOG = 'INFO :: ';
const DEBUG_LOG = 'DEBUG :: ';
const ERROR_LOG = 'ERROR :: ';

module.exports.info = function (message) {
    console.log(chalk.blue(INFO_LOG + message))
}
module.exports.error = function (message) {
    if (process.env.NODE_ENV == 'development') {
        console.log(chalk.red(ERROR_LOG + message))
    }
}
module.exports.debug = function (message) {
    if (process.env.NODE_ENV == 'development') {
        console.log(chalk.green(DEBUG_LOG + message))
    }
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

module.exports.logger = logger;


