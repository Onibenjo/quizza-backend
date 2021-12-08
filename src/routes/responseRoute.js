const express = require("express");

const responseController = require("../controllers/responseController");

const router = express.Router();

router.route('/')
  .get(responseController.getResponses)
  .post(responseController.saveResponse);

module.exports = router;
