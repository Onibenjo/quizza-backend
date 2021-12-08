const morgan = require("morgan");
// const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");

const middleware = (app) => {
  app.enable("trust proxy");
  app.use(cors()); // Access-Control-Allow-Origin * ('*' means all the requests no matter where they are coming from)
  app.options("*", cors());
  app.use(helmet());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(compression());
  if (!process.env.NODE_ENV === "production") {
    app.use(morgan("dev"));
  }

  app.use(morgan("tiny"));
};

module.exports = middleware;
