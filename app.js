const express = require("express");

const globalErrorHandler = require("./api/error/errorController");
const APIError = require("./api/error/apiError");
const middlewares = require("./api/middlewares/middleware");
const Routes = require("./api/routes")

//Start express app
const app = express();

// MIDDLEWARES
middlewares(app);

const apiV1= '/api/v1/'

// ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({ Name: "Quizza Backend" });
});

app.use(apiV1, Routes.documentation);
app.use(apiV1, Routes.responses);
app.use(apiV1, Routes.quiz);
app.use(apiV1, Routes.questions);
app.use(apiV1, Routes.quizMaster);
app.use(apiV1, Routes.vehicle);


//404 Route
app.use("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
