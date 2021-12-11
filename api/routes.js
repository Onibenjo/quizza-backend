class Routes {
  constructor() {
    this.quiz = require("./src/quiz/quiz.route");;
    this.questions = require('./src/questions/question.route');
    this.responses = require("./src/response/response.route");;
    this.documentation = require("./src/documentation/docRoute");;
  }
}

module.exports = new Routes();
