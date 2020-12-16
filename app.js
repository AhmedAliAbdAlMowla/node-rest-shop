const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const { json } = require("express");

//midlleware
app.use(logger("dev"));

// pareser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect with db
const URI = "mongodb://localhost/node-rest-shop";
mongoose
  .connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,

    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Sucses Connect..");
  })
  .catch((error) => console.log(error));

// middleware handling   CORS polesy error
app.use((req, res, next) => {
  res.setHeader("Access-Conreol-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GIT, POST, PUT, PATCH, DELETE "
    );
    return res.status(200).json({});
  }

  next();
});

// Routes which handle requests
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

// error handle
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error.status);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
