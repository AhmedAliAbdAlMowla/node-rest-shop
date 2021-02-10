import mongoose from "mongoose";

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

export default mongoose.model("Order", orderSchema);
