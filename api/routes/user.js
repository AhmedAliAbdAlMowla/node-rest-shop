const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ message: "User already reqestered." });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .status(201)
    .header("x-auth-token", token)
    .json({ user: _.pick(user, ["_id", "name", "email"]) });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("name email password");
  res.status(200).json({
    user: user,
  });
});

module.exports = router;
