const productsRoutes = require("../routes/products");
const ordersRoutes = require("../routes/orders");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/orders", ordersRoutes);
  
  
};
