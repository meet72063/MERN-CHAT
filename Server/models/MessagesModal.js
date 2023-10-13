const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  to: String,
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: String,
  time: String,
});

const Message = mongoose.model("message", messageSchema);

module.exports = { Message };
