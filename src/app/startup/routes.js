import productsRoutes from "../routes/products";
import ordersRoutes from "../routes/orders";
import userRoutes from "../routes/user";

module.exports = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/orders", ordersRoutes);
};
