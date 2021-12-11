const express = require("express");

const globalErrorHandler = require("./src/error/errorController");
const APIError = require("./src/error/apiError");
const middlewares = require("./src/middlewares/middleware");
const responseRoute = require("./src/routes/responseRoute");
const quizRoute = require("./src/routes/quizRoute");
const docRoute = require("./src/routes/docRoute");

//Start express app
const app = express();

// MIDDLEWARES
middlewares(app);

const apiV1= '/api/v1/'

// ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({ Name: "Quizza Backend" });
});
app.use(apiV1, docRoute);
app.use(apiV1, responseRoute);
app.use(apiV1, quizRoute);

//404 Route
app.use("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
