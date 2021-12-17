const express = require("express");

const responseController = require("./response.controller");

const router = express.Router();

router.route('/responses')
  .get(responseController.getResponses)
  .post(responseController.saveResponse);

module.exports = router;
