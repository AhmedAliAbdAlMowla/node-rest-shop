const express = require("express");
const logger = require("morgan");
const app = express();
const core = require("./api/middleware/cores");

const { json } = require("express");
const error = require("./api/middleware/error");
//midlleware
app.use(logger("dev"));

// pareser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// config
require("./api/startup/config")();
// logging
require("./api/startup/logging")();
// connect with db
require("./api/startup/db")();
// middleware handling   CORS polesy error
// app.use(core);

// Routes which handle requests
require("./api/startup/routes")(app);

// error handler
app.use(error);
// production
// require("./api/startup/prod")(app);
module.exports = app;
