const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.getAll = (req, res) => {
  Order.find()
    .populate("product", "name price")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:8080/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getOne = (req, res) => {
  Order.findById(req.params.orderId)
    .select("product quantity")
    .populate("product", "name price")
    .exec()
    .then((order) => {
      if (order) {
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:8080/orders/" + order._id,
          },
        });
      } else {
        let err = new Error("Order not found !");
        err.status = 404;
        throw err;
      }
    })
    .catch((err) => {
      res.status(err.status || 500).json({
        error: err.message,
      });
    });
};

exports.createOrder = (req, res) => {
  Product.findById(req.body.productId)
    .exec()
    .then((product) => {
      if (!product) {
        // error handleing
        let err = new Error("Product not found");
        err.status = 404;
        throw err;
      }

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({
        error: err.message,
      });
    });
};

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      if (result.deletedCount) {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:8080/orders/",
            body: { productId: "ID", quantity: "Number" },
          },
        });
      } else {
        let err = new Error("Order not found");
        err.status = 404;
        throw err;
      }
    })
    .catch((err) => {
      res.status(err.status || 500).json({ error: err.message });
    });
};
