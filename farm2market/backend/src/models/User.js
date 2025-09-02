const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
  name: { type: String, trim: true },
  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
    suburb: { type: String, default: "" },
    province: { type: String, default: "" },
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
