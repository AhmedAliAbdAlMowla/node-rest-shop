const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

// login
module.exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);

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
};

// signup
module.exports.signup = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ message: "User already reqestered." });

  user = new User(_.pick(req.body, ["name", "email", "password", "phone"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .status(201)
    .header("x-auth-token", token)
    .json({ user: _.pick(user, ["_id", "name", "email", "phone"]) });
};

// login validate
const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string().max(1024).min(5).required(),
  });
  return schema.validate(req);
};
