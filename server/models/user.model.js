const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [
    {
      type: String
    }
  ],
  versionKey: false,
});
module.exports = mongoose.model("User", UserSchema);
