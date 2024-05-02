const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username must be provided"],
      minLength: [6, "Username must be above 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: [true, "e-mail must be unique"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minLength: [6, "Password must be above 6 characters"],
    },
    resetLink:{
      type:String,
      default:''
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);