import Joi from "joi";
// validate creat product
export const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().integer().min(1).required(),
    brand: Joi.string().min(3).max(1024).required(),
    category: Joi.string().min(3).max(1024).required(),
    countInStock: Joi.number().integer().min(1).required(),
    description: Joi.string().min(3).max(1024).required(),
  });
  return schema.validate(product);
};
// validate update product
export const validateUpdateProduct = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    price: Joi.number().integer().min(1),
    brand: Joi.string().min(3).max(1024),
    category: Joi.string().min(3).max(1024),
    countInStock: Joi.number().integer().min(1),
    description: Joi.string().min(3).max(1024),
  });
  return schema.validate(body);
};
