const router = require("express").Router();

const checkAuth = require("../middleware/check_auth");

const productController = require("../controllers/products");
// Handle incoming GET requests to  /products
router.get("/", productController.getAll);

router.get("/:productId", productController.getOne);

router.post("/", checkAuth, productController.createProduct);

router.patch("/:productId", checkAuth, productController.updateProduct);

router.delete("/:productId", checkAuth, productController.deleteProduct);

module.exports = router;
