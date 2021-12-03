// const validator = require('validator');
const mongoose = require("mongoose");

const responseSchema = mongoose.Schema(
  {
    data: {},
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamp: true }
);

const response = mongoose.model("response", responseSchema);

module.exports = response;
