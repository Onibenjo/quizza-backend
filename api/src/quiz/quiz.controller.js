const CrudService = require("../../db/dbQuery");
const catchAsync = require("../../error/catchAsync");
const QuizModel = require("./quiz.model");
const APIError = require("../../error/apiError");

exports.create = catchAsync(async (req, res) => {
  const { title, description } = req.body; //extract title and description

  if (!title || !description)
    return next(new APIError("Please Enter title and description", 400));

  const quiz = new QuizModel();
  quiz.title = title;
  quiz.description = description;
  await quiz.save();

  return res.status(201).json({
    status: "success",
    title,
    description,
  });
});

exports.delete = CrudService.deleteOne(QuizModel);
exports.getAll = CrudService.getAll(QuizModel);
