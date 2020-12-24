const productsRoutes = require("../routes/products");
const ordersRoutes = require("../routes/orders");
const userRoutes = require("../routes/user");

module.exports = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/orders", ordersRoutes);
};
