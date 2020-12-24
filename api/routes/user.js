const router = require("express").Router();

const userControler = require("../controllers/user");

router.post("/login", userControler.login);

router.post("/signup", userControler.signup);

module.exports = router;
