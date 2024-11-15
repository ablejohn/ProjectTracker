const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  filePath: {
    type: String, // Path to the uploaded file
    required: false,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
