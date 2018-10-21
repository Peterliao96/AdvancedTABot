const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: Object,
});

module.exports = mongoose.model('Message', messageSchema);
