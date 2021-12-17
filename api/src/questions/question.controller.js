const QuestionModel = require("./question.model");
const catchAsync = require("../../error/catchAsync");
const APIError = require("../../error/apiError");
const dbQuery = require("../../db/dbQuery");

exports.create = catchAsync(async (req, res, next) => {
  const { question, answer, options } = req.body; 

  if (!answer || !options || !question)
    return next(new APIError("Please provide all required fields", 400));

  const quiz = req.params.id;

  const newQuestion = new QuestionModel();

  newQuestion.question = question;
  newQuestion.answer = answer;
  newQuestion.options = options;
  newQuestion.quiz = quiz;

  if (newQuestion.options.length < 4)
    return next(new APIError("Please provide at least 4 options", 400));

  const quest = await newQuestion.save();

  return res.status(201).json({
    status: "success",
    quest,
  });
});

exports.getAllQuestion = dbQuery.getAll(QuestionModel)