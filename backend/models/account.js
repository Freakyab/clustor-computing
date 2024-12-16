const mongoose = require("mongoose");
const client = require("../config");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const Account = client.model('Account', accountSchema);

module.exports = Account;
