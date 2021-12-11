const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide your password!"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Quiz = mongoose.model("quiz", quizSchema);
module.exports = Quiz;
