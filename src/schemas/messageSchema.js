const mongoose = require('mongoose');

const { Schema } = mongoose;

const Message = new Schema({
  sendingUser: String,
  room: String,
  text: String,
});

module.exports = mongoose.model('Message', Message);
