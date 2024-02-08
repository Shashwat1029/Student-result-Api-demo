const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  phone: String,
  rollNumber: Number,
  pinCode: String,
  physics: Number,
  chemistry: Number,
  mathematics: Number,
  english: Number,
  photo: String,
  signature: String,
});

module.exports = mongoose.model("User", userSchema);
