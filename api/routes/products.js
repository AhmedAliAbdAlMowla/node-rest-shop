const router = require("express").Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const productController = require("../controllers/products");

// Handle incoming GET requests to  /products
router.get("/", productController.getAll);

router.get("/:productId", productController.getOne);

router.post("/", [ auth, admin], productController.createProduct);

router.put("/:productId", [ auth, admin], productController.updateProduct);

router.delete("/:productId", [ auth, admin], productController.deleteProduct);

module.exports = router;
