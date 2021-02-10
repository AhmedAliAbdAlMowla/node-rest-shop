const router = require("express").Router();

import auth from "../middleware/auth";

import * as ordersController from "../controllers/orders";

router.get("/", auth, ordersController.getAll);

router.get("/:orderId", auth, ordersController.getOne);

router.post("/", auth, ordersController.createOrder);

router.delete("/:orderId", auth, ordersController.deleteOrder);

router.patch("/:orderId", auth, ordersController.updateOrder);

export default router;
