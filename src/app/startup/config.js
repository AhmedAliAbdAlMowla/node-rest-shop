if (process.env.NODE_ENV.trim() === "development")
  require("dotenv/config");
module.exports = () => {
  if (!process.env.jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not define. ");
  }
};
