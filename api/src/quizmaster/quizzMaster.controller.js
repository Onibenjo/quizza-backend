const catchAsync = require("../../error/catchAsync");
const QuizMaster = require("./quizMaster.model");
const APIError = require("../../error/apiError");
const dbQuery = require("../../db/dbQuery");

exports.createAccount = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new APIError("Please enter a username and password", 400));
  }

  const newQuizMaster = new QuizMaster();

  newQuizMaster.username = username;
  newQuizMaster.password = password;

  await newQuizMaster.save();

  res
    .status(201)
    .json({ status: "success", message: "Account created successfully" });
});

exports.getAllQuizMaster = dbQuery.getAll(QuizMaster)