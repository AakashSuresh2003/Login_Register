const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provided"],
      minLength: [6, "Username must be above 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: [true, "e-mail must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minLength: [6, "Password must be above 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
