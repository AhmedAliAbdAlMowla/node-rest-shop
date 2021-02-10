import Joi from "joi";
// validate signup
export const validateSignup = (user) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(5).required(),
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string()
      .max(1024)
      .min(8)
      .required()
      .regex(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    // regex Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    phone: Joi.string().min(11).required(),
  });
  return schema.validate(user);
};

// validate login 
export const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string().max(1024).min(5).required(),
  });
  return schema.validate(req);
};
