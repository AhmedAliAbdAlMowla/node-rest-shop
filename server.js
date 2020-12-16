const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, (err) =>
  console.log(err ? err : `Server runing in port :${PORT}`)
);
