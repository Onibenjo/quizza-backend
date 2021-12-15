const express = require("express");

const quizMasterController = require("./quizzMaster.controller");

const router = express.Router();

router
  .route("/quizmasters")
  .get(quizMasterController.getAllQuizMaster)
  .post(quizMasterController.createAccount);

module.exports = router;
