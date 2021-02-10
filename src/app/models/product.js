import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
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


export default  mongoose.model("Product", productSchema);

