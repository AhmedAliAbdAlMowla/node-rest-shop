const router = require("express").Router();
const { json } = require("express");

const auth = require("../middleware/auth");

const ordersController = require("../controllers/orders");

router.get("/", auth, ordersController.getAll);

router.get("/:orderId", auth, ordersController.getOne);

router.post("/", auth, ordersController.createOrder);

router.delete("/:orderId", auth, ordersController.deleteOrder);

module.exports = router;
