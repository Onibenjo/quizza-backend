const express = require("express");

const QuestionController = require("./question.controller");
const router = express.Router();

router
  .route("/quiz/:id/question")
  .post(QuestionController.create)
  .get(QuestionController.getAllQuestion);

module.exports = router;
