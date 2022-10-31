const express = require("express");

const vehicleController = require("./vehicle.controller");

const router = express.Router();

router.route('/vehicles')
  .get(vehicleController.getVehicle)
  .post(vehicleController.createVehicle);

module.exports = router;
