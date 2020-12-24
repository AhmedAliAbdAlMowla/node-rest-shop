const router = require("express").Router();

const auth = require("../middleware/auth");

const productController = require("../controllers/products");
// Handle incoming GET requests to  /products
router.get("/", productController.getAll);

router.get("/:productId", productController.getOne);

router.post("/", auth, productController.createProduct);

router.patch("/:productId", auth, productController.updateProduct);

router.delete("/:productId", auth, productController.deleteProduct);

module.exports = router;
