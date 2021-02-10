import express from "express";
import logger from "morgan";
const app = express();
import core from "./middleware/cores";
import error from "./middleware/error";
import notfound from "./middleware/notFound";

//midlleware
app.use(logger("dev"));

// pareser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// config
require("./startup/config")();

// logging
require("./startup/logging")();

// connect with db
require("./startup/db")();

// middleware handling   CORS polesy error
app.use(core);

// Routes which handle requests
require("./startup/routes")(app);

// error handler
app.use(error);
// not found handler
app.use(notfound);
// production
require("./startup/prod")(app);
export default app;
