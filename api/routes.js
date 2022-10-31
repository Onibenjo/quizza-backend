class Routes {
  constructor() {
    this.quiz = require("./src/quiz/quiz.route");
    this.questions = require("./src/questions/question.route");
    this.responses = require("./src/response/response.route");
    this.quizMaster = require("./src/quizmaster/quizMaster.route");
    this.documentation = require("./src/documentation/docRoute");
    this.vehicle = require("./src/vehicle/vehicle.route");
  }
}

module.exports = new Routes();
