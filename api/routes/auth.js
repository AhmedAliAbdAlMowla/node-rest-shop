const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password." });
  const token = user.generateAuthToken();
  res
    .status(200)
    .header("x-auth-token", token)
    .json({ message: "succes Auth" });
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string().max(1024).min(5).required(),
  });
  return schema.validate(req);
};
module.exports = router;
