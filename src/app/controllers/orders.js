import  User  from "../models/user";
import _ from "lodash";
import Order from "../models/order";
import { validateOrder, validateUpdateOrder } from "../validators/order";
import  Product  from "../models/product";

export const getAll = async (req, res) => {
  const orders = await Order.find().populate("product");

  const response = {
    count: orders.length,
    orders: orders.map((doc) => {
      return {
        _id: doc._id,
        quantity: doc.quantity,
        product: _.pick(doc.product, ["name", "price", "brand"]),
        shipping: doc.shipping,
        request: {
          type: "GET",
          url: "http://localhost:8080/api/orders/" + doc._id,
        },
      };
    }),
  };

  res.status(200).json(response);
};

export const getOne = async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate("product");

  if (order) {
    res.status(200).json({
      order: {
        _id: order._id,
        quantity: order.quantity,
        product: _.pick(order.product, ["name", "price", "brand"]),
        shapping: order.shipping,
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

export const createOrder = async (req, res) => {
  const { error } = validateOrder(req.body);

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

export const deleteOrder = async (req, res) => {
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

export const updateOrder = async (req, res) => {
  const updateOps = {};

  let propShapingName = ["address", "city", "postalCode", "country"];
  let propName = ["quantity"];

  for (const ops of req.body) {
    let checkValid = {};
    checkValid[ops.propName] = ops.value;
    // validate body
    const { error } = validateUpdateOrder(checkValid);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (propName.includes(ops.propName) && ops.value) {
      updateOps[ops.propName] = ops.value;
    } else if (propShapingName.includes(ops.propName) && ops.value) {
      updateOps["shipping." + ops.propName] = ops.value;
    } else {
      return res.status(400).json({
        message: "error in bodyData !!",
        exampleForBody: " [ { 'propName': 'quantity', 'value': '2'}]",
      });
    }
  }

  const result = await Order.updateOne(
    { _id: req.params.orderId },
    { $set: updateOps }
  );

  if (result.n) {
    res.status(200).json({
      message: "order updated",
      request: {
        type: "GET",
        url: "http://localhost:8080/api/orders/" + req.params.orderId,
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};
