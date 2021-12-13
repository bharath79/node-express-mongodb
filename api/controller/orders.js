const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.order_get_all = (req, res, next) => {
  Order.find()
    .select("quantity price _id")
    .populate("product", "_id name")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.order_create = (req, res, next) => {
  Product.findById(req.body.productId).then((product) => {
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      order
        .save()
        .then((result) => {
          res.status(201).json({
            _id: result._id,
            product: result.product,
            quantity: result.quantity,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.order_update = (req, res, next) => {
  const id = req.params.id;

  Order.updateOne(
    { _id: id },
    { quantity: req.body.quantity, product: req.body.product }
  )
    .exec()
    .then((result) => {
      if (result["modifiedCount"] > 0) {
        res.status(200).json({
          message: "updated successfully",
        });
      } else {
        res.status(404).json({
          message: "No Information found for the ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.order_delete = (req, res, next) => {
  const id = req.params.id;
  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result["deletedCount"] > 0) {
        console.log(result);
        res.status(200).json({
          message: "deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "No Information found for the ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.order_get = (req, res, next) => {
  const id = req.params.id;
  Order.findById({ _id: id })
    .populate("product")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          _id: result["_id"],
          quantity: result["quantity"],
          productId: result["product"],
        });
      } else {
        res.status(404).json({
          message: "No Information found for the ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
