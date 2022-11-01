const dbQuery = require("../../db/dbQuery");
const Response = require("./response.model");
const catchAsync = require("../../error/catchAsync");

exports.saveResponse = catchAsync(async (req, res, next) => {
  let { device, option } = req.body;
  const response = await Response.create({ device, option });

  global._io.emit("response", response);

  console.log(`${device} CLICKED ${option}`)

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

exports.getResponses = dbQuery.getAll(Response);
