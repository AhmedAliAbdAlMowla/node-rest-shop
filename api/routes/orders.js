const router = require("express").Router();
const { json } = require("express");

const checkAuth = require("../middleware/check_auth");

const ordersController = require("../controllers/orders");

router.get("/", checkAuth, ordersController.getAll);

router.get("/:orderId", checkAuth, ordersController.getOne);

router.post("/", checkAuth, ordersController.createOrder);

router.delete("/:orderId", checkAuth, ordersController.deleteOrder);

module.exports = router;
