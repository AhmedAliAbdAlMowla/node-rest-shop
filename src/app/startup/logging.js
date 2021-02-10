import winston from "winston";
import "express-async-errors"; // for error handeler async
import "winston-mongodb";
// logging
module.exports = () => {
  // log ex or info or error in console
  winston.add(
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.simple()
      ),
    })
  );

  // log in file ex or rejection
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
      handleRejections: true,
      level: "error",
    })
  );
  // log in  db ex or rejection
  winston.add(
    new winston.transports.MongoDB({
      db: process.env.dbUrl,
      options: { useUnifiedTopology: true },
      handleExceptions: true,
      handleRejections: true,
      level: "error",
    })
  );
};
