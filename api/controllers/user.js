const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Email exsist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "User created.",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err.message,
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Auth faild",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json("Auth faild");
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              "secret",
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth faild",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
