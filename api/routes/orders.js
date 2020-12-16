const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "orders git route",
  });
});

router.post("/", (req, res) => {
  const order = {
    orderId: req.body.orderId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "order post route",
    order: order,
  });
});

router.patch("/:orderId", (req, res) => {
  res.status(200).json({
    message: "order patch route",
    productId: req.params.orderId,
  });
});

router.delete("/:orderId", (req, res) => {
  res.status(200).json({
    message: "order delet route",
    productId: req.params.orderId,
  });
});

module.exports = router;
