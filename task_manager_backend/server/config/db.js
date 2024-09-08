const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = { connection, mongoose };