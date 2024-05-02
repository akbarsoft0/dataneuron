const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  age: Number,
});
const UserModal = mongoose.model("users", UserSchema);

module.exports = UserModal;
