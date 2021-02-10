import Joi from "joi";
// validatr creat new order 
export const validateOrder = (order) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).max(100).required(),
    address: Joi.string().max(1024).min(3).required(),
    city: Joi.string().max(1024).min(3).required(),
    postalCode: Joi.string().max(1024).min(3).required(),
    country: Joi.string().max(1024).min(3).required(),
  });
  return schema.validate(order);
};
// validate update order
export const validateUpdateOrder = (body) => {
  const schema = Joi.object({
    quantity: Joi.number().integer().min(1).max(100),
    address: Joi.string().alphanum().min(3).max(1024),
    city: Joi.string().min(3).max(1024),
    postalCode: Joi.string().min(3).max(1024),
    country: Joi.string().min(3).max(1024),
  });
  return schema.validate(body);
};
