// const validator = require('validator');
const mongoose = require("mongoose");

const responseSchema = mongoose.Schema(
  {
    option: {
      type: String,
      required: [true, "Please provide option"],
      maxLength: 1
    },
    device: {
      type: Number,
      required: [true, "Please provide device number"],
    },
  },
  { versionKey: false, timestamp: true }
);

const response = mongoose.model("response", responseSchema);

module.exports = response;
