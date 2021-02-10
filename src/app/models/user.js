import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  cart: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  Dcreate: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey,
    {
      expiresIn: "3h",
    }
  );
  return token;
};

export default mongoose.model("User", userSchema);
