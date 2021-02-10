import mongoose from "mongoose";
import winston from "winston";

// db connect
module.exports = () => {
  mongoose
    .connect(process.env.dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,

      useFindAndModify: false,
    })
    .then(() => winston.info("mongodb connect .."));
};
