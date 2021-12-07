const express = require("express");

const globalErrorHandler = require("./src/error/errorController");
const APIError = require("./src/error/apiError");
const middlewares = require("./src/middlewares/middleware");
const responseController = require("./src/controllers/responseController");

//Start express app
const app = express();

// MIDDLEWARES
middlewares(app);

// ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({ Name: "Quizza Application" });
});
app.post("/api/v1/responses", responseController.saveResponse);
app.get("/api/v1/responses", responseController.getResponses);

//404 Route
app.use("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
