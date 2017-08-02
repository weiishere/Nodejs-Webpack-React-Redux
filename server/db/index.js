const mongoose = require('mongoose');
const config = require('./config');

var promise = mongoose.connect(config.db.mongodb, {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
});

module.exports =promise;