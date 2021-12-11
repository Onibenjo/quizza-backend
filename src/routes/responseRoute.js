const express = require("express");

const responseController = require("../controllers/responseController");

const router = express.Router();

router.route('/responses')
  .get(responseController.getResponses)
  .post(responseController.saveResponse);

module.exports = router;
