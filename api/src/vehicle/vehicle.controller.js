const dbQuery = require("../../db/dbQuery");
const VehicleModel = require("./vehicle.model");
const catchAsync = require("../../error/catchAsync");
const APIError = require("../../error/apiError");

exports.createVehicle = catchAsync(async (req, res, next) => {
  const { name, location, longitude, latitude } = req.body;

  if (!location || !longitude || !name || !latitude)
    return next(new APIError("Please provide all required fields", 400));

  const newVehicle = await VehicleModel.create({ ...req.body });

  return res.status(201).json({
    status: "success",
    newVehicle,
  });
  
});

exports.getVehicle = dbQuery.getAll(VehicleModel);
