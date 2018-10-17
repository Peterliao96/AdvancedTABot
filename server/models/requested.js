const mongoose = require('mongoose');

const requestedSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  UserId:String,
  statusApproved: Boolean,
  statusIgnore: Boolean
})

module.exports = mongoose.model('Requested', requestedSchema);
