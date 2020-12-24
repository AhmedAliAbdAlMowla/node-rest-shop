const http = require("http");
const app = require("./app");
const winston = require("winston");
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, (err) =>
winston.info(err ? err : `Server runing in port :${PORT}`)
);
