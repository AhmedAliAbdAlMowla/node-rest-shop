const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  default: false,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(5).required(),
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string()
      .max(1024)
      .min(8)
      .required()
      .regex(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    // regex Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  });
  return schema.validate(user);
};

exports.User = mongoose.model("User", userSchema);
exports.validate = validateUser;
