const express = require("express");

const globalErrorHandler = require("./src/error/errorController");
const APIError = require("./src/error/apiError");
const middlewares = require("./src/middlewares/middleware");
const responseRoute = require("./src/routes/responseRoute");

//Start express app
const app = express();

// MIDDLEWARES
middlewares(app);

// ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({ Name: "Quizza Backend" });
});

app.use("/api/v1/responses", responseRoute);

//404 Route
app.use("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
