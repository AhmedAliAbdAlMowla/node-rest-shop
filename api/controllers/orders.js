const mongoose = require("mongoose");
const { User, validateUser } = require("../models/user");
const _ = require("lodash");
const { Order, validate } = require("../models/order");
const { Product, validateProd } = require("../models/product");

exports.getAll = async (req, res) => {
  const orders = await Order.find().populate("product");

  const response = {
    count: orders.length,
    orders: orders.map((doc) => {
      return {
        order: _.pick(doc, ["_id", "quantity", "shipping"]),
        product: _.pick(doc.product, ["name", "price", "brand"]),
        request: {
          type: "GET",
          url: "http://localhost:8080/api/orders/" + doc._id,
        },
      };
    }),
  };

  res.status(200).json(response);
};

exports.getOne = async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate("product");

  if (order) {
    res.status(200).json({
      order: {
        _id: order._id,
        product: _.pick(order.product, ["name", "price", "brand"]),
        shapping: order.shipping,
        quantity: order.quantity,
        request: {
          type: "GET",
          url: "http://localhost:8080/api/orders/" + order._id,
        },
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};

exports.createOrder = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const product = await Product.findById({ _id: req.body.productId });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const order = new Order({
    shipping: _.pick(req.body, ["city", "address", "country", "postalCode"]),
    product: req.body.productId,
    quantity: req.body.quantity,
  });

  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        cart: {
          _id: order._id,
        },
      },
    },
    { new: true }
  );

  await order.save();

  res.status(201).json({
    message: "Order stored",
    createdOrder: {
      _id: order._id,
      product: _.pick(product, ["name", "price", "brand"]),
      shipping: order.shipping,
      quantity: order.quantity,
    },
    request: {
      type: "GET",
      url: "http://localhost:8080/api/orders/" + order._id,
    },
  });
};

exports.deleteOrder = async (req, res) => {
  const result = await Order.deleteOne({ _id: req.params.orderId });

  if (result.deletedCount) {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: {
          cart: {
            _id: req.params.orderId,
          },
        },
      }
    );
    res.status(200).json({
      message: "Order deleted",
      request: {
        type: "POST",
        url: "http://localhost:8080/api/orders/",
        body: {
          productId: "ID",
          quantity: "Number",
          address: "String",
          city: "String",
          postalCode: "String",
          country: "String",
        },
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};
