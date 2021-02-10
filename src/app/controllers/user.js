import User from "../models/user";
import  { validateSignup , validateLogin}  from '../validators/user';
import bcrypt from "bcrypt";
import _ from "lodash";

// login
export const login = async (req, res) => {
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
export const signup = async (req, res) => {
  const { error } = validateSignup(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ message: "User already reqestered." });

  user = new User(_.pick(req.body, ["name", "email", "password", "phone"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  let { _id, name, email, phone } = user;
  res
    .status(201)
    .header("x-auth-token", token)
    .json({ user: { _id, name, email, phone } });
};


