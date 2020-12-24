const { Product, validate } = require("../models/product");
const _ = require("lodash");

exports.getAll = async (req, res) => {
  const products = await Product.find();

  const response = {
    count: products.length,
    products: products.map((doc) => {
      return {
        product: _.pick(doc, [
          "_id",
          "name",
          "price",
          "brand",
          "category",
          "description",
        ]),
        request: {
          type: "GET",
          url: "http://localhost:8080/api/products/" + doc._id,
        },
      };
    }),
  };

  res.status(200).json(response);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById({ _id: req.params.productId }).select(
    "_id name price brand category countInStock description "
  );

  if (product) {
    res.status(200).json({
      product: product,
      request: {
        type: "GET",
        url: "http://localhost:8080/api/products/" + product._id,
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};

exports.createProduct = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const product = new Product(
    _.pick(req.body, [
      "name",
      "price",
      "brand",
      "category",
      "countInStock",
      "description",
    ])
  );

  await product.save();

  res.status(201).json({
    message: "Created product successfully",
    createProduct: _.pick(product, [
      "_id",
      "name",
      "price",
      "brand",
      "category",
      "countInStock",
      "description",
    ]),
    request: {
      type: "GET",
      url: "http://localhost:8080/api/products/" + product._id,
    },
  });
};

exports.updateProduct = async (req, res) => {
  const updateOps = {};
  var propName = [
    "name",
    "price",
    "brand",
    "category",
    "countInStock",
    "description",
  ];
  for (const ops of req.body) {
    if (propName.includes(ops.propName) && ops.value) {
      // validate body
      updateOps[ops.propName] = ops.value;
    } else {
      return res.status(400).json({
        message: "error in bodyData !!",
        exampleForBody: " [ { 'propName': 'price', 'value': '620'}]",
      });
    }
  }

  const result = await Product.updateOne(
    { _id: req.params.productId },
    { $set: updateOps }
  );

  if (result.n) {
    res.status(200).json({
      message: "product updated",
      request: {
        type: "GET",
        url: "http://localhost:8080/api/products/" + result._id,
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};

exports.deleteProduct = async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.productId });

  if (result.n) {
    res.status(200).json({
      message: "product deleted",
      request: {
        type: "POST",
        url: "http://localhost:8080/api/products",
        body: {
          name: "String",
          price: "Number",
          brand: "String",
          category: "String",
          countInStock: "Number",
          description: "String",
        },
      },
    });
  } else {
    res.status(404).json({ message: "No valid entry found for provided ID" });
  }
};
