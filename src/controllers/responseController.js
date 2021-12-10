const crudService = require("../services/crudService");
const Response = require("../models/responseModel");
const catchAsync = require("../error/catchAsync");

exports.saveResponse = catchAsync(async (req, res, next) => {
  const response = new Response();
  response.data = req.body;

  await response.save();

  global._io.emit("response", response);

  res.status(200).json({
    status: "success",
    response,
  });
});

exports.io = (msg) => {
  return (req, res, next) => {
    console.log(msg);
    next();
  };
};

exports.getResponses = crudService.getAll(Response);
