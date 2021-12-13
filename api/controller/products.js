const Product = require("../models/product");
const mongoose = require("mongoose");

exports.product_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id")
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

exports.product_get = (req, res, next) => {
  const id = req.params.id;
  Product.findById({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          name: result["name"],
          price: result["price"],
          _id: result["_id"],
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

exports.product_delete = (req, res, next) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result["deletedCount"] > 0) {
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

exports.product_update = (req, res, next) => {
  const id = req.params.id;

  Product.updateOne({ _id: id }, { name: req.body.name, price: req.body.price })
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

exports.product_create = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      res.status(200).json({
        _id: result["_id"],
        name: result["name"],
        productImage: result["productImage"],
        price: result["price"],
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
