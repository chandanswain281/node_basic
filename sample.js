const { createLogger, transports, format } = require("winston");
const Util = require("util");
const SettingCache = require('../cache/setting');
const CacheKey = require('../cache/helpers/key');
const loglevels = require("./loglevels");

require("winston-kafka-stream");

const logger = createLogger({
  level: "debug",
  transports: [
    new transports.KafkaStream({
      kafkaHost: SettingCache.get(CacheKey.GENERIC.KAFKA.CONNECTION.CLUSTER.URL),
      // kafkaHost: "localhost:9092",
      producer: {
        topic: SettingCache.get(CacheKey.BOOTSTRAP_SERVER.KAFKA.TOPIC.GENERIC.LOGGER),
        // topic: "log_topic",
      },
    }),
  ],
});

var loggerFuncs = {
  log: logger.log.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  debug: logger.debug.bind(logger),
};

// For logging timestamp change
Object.keys(loggerFuncs).forEach(function (k) {
  logger[k] = function () {
    var K = k.toUpperCase();
    arguments[0] = Util.format(
      "[" + new Date().toISOString() + "]" + "[" + K + "]",
      arguments[0]
    );
    loggerFuncs[k].apply(logger, arguments);
  };
});

// For logging timestamp change
var consoleFuncs = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console)
};

// For logging timestamp change
Object.keys(consoleFuncs).forEach(function (k) {
  console[k] = function () {
    var K = k.toUpperCase();
    arguments[0] = Util.format('[' + new Date().toISOString() + ']' + '[' + K + ']', arguments[0]);
    consoleFuncs[k].apply(console, arguments);
  };
});

module.exports = (loglevel, applicationid, moduleid, ...args) => {
  if (loglevel.toUpperCase() == "ERROR" || loglevel == loglevels.ERROR) {
    //logger.error(applicationid + " - " + moduleid + " - " + message);
    console.error(applicationid + " - " + moduleid, ...args);
  } else if (loglevel.toUpperCase() == "DEBUG" || loglevel == loglevels.DEBUG) {
    //logger.debug(applicationid + " - " + moduleid + " - " + message);
    console.debug(applicationid + " - " + moduleid, ...args);
  } else if (loglevel.toUpperCase() == "WARN" || loglevel == loglevels.WARN) {
    //logger.warn(applicationid + " - " + moduleid + " - " + message);
    console.warn(applicationid + " - " + moduleid, ...args);
  } else {
    //logger.info(applicationid + " - " + moduleid + " - " + message);
    console.info(applicationid + " - " + moduleid, ...args);
  }
};
