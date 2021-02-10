const router = require("express").Router();

import * as userControler from "../controllers/user";

router.post("/login", userControler.login);

router.post("/signup", userControler.signup);

export default router;
