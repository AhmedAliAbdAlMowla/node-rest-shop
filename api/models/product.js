const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  brand: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    default: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// productSchema.methods.generateImageUrl = function () {
//   return "/https:/awsImage.com";
// };

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(2).required(),
    price: Joi.number().required(),
    // image: Joi.string().max(1024).min(3).required(),
    brand: Joi.string().max(1024).min(3).required(),
    category: Joi.string().max(1024).min(3).required(),
    countInStock: Joi.number().required(),
    description: Joi.string().max(1024).min(3).required(),
  });
  return schema.validate(product);
};
exports.Product = mongoose.model("Product", productSchema);
exports.validate = validateProduct;
