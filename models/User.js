const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: { type: String, required: true },   // <-- FIXED
  role: {
    type: String,
    enum: ["admin", "examiner", "student"],
    default: "admin"
  }
});

module.exports = mongoose.model("User", UserSchema);
