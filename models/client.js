const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'standard'
  },
  osname: {
    type: String,
    default: 'IOS 11'
  },
  appversion: {
    type: String,
    default: '3.0'
  },
  language: {
    type: String,
    default: 'EN'
  },
});

module.exports = mongoose.model('Client', clientSchema);
