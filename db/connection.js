const mongoose = require('mongoose');
const logger = require('../services/logger');

mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  logger.error(`⛔ → ${err.message}`);
});
