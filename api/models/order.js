const Joi = require("joi");
const mongoose = require("mongoose");

const shippingSchema = {
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
};

const orderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Product",
    required: true,
  },
  shipping: shippingSchema,
  quantity: {
    type: Number,
    required: true,
  },
});

const validateOrder = (order) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    address: Joi.string().max(1024).min(3).required(),
    city: Joi.string().max(1024).min(3).required(),
    postalCode: Joi.string().max(1024).min(3).required(),
    country: Joi.string().max(1024).min(3).required(),
  });
  return schema.validate(order);
};

exports.Order = mongoose.model("Order", orderSchema);
exports.validate = validateOrder;
