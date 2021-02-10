const router = require("express").Router();
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import * as productController from "../controllers/products";


router.get("/", productController.getAll);

router.get("/:productId", productController.getOne);

router.post("/", [ auth, admin], productController.createProduct);

router.patch("/:productId", [ auth, admin], productController.updateProduct);

router.delete("/:productId", [ auth, admin], productController.deleteProduct);

export default router;
