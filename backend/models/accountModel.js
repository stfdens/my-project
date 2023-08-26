const mongoose = require('mongoose');

const accountModel = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('account', accountModel);
