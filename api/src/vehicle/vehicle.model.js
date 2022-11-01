// const validator = require('validator');
const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    longitude: {
      type: Number,
      required: [true, "Please provide longitude"],
    },
    latitude: {
      type: Number,
      required: [true, "Please provide latitude"],
    },
  },
  { versionKey: false, timestamp: true }
);

const vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicle;
