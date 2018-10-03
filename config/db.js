const mongoose = require('mongoose');
const config = require('./config').config();

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

// Initialize Mongoose
module.exports.connect = function (callback) {
    mongoose
        .connect(config.MONGO_URI)
        .then(function (connection) {
            // Call callback FN
            console.log("---CONNECTED---")
            if (callback) callback(null, connection.db);
        })
        .catch(function (err) {
            console.log("---NOT CONNECTED---" + err)
            if (callback) callback(err);
        });
};

module.exports.disconnect = function (cb) {
    mongoose.connection.db
        .close(function (err) {
            return cb(err);
        });
};