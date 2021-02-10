import http from "http";
import app from "./app/app";
import winston from "winston";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, (err) =>
  winston.info(err ? err : `Server runing in port :${PORT}`)
);
