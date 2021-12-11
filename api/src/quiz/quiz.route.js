const express = require("express");

const QuizController = require("./quiz.controller");

const router = express.Router();

router
  .route("/quiz")
  .get(QuizController.getAll)
  .post(QuizController.create);

router.delete("/quiz/:id", QuizController.delete);



module.exports = router;
