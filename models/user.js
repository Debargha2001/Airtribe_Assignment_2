const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name not provided "],
    },
    email: {
      type: String,
      unique: [true, "email already exists in database!"],
      trim: true,
      required: [true, "email not provided"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;