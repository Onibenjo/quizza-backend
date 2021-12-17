const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide a question"],
    },
    answer: {
      type: String,
      required: [true, "Please provide your answer!"],
    },
    options: {
      type: [String],
      required: [true, "Please provide options!"],
    },
    quiz: {
      type: mongoose.ObjectId,
      ref: "quiz",
      required: [true, "Please provide quizId!"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Question = mongoose.model("question", questionSchema);
module.exports = Question;
