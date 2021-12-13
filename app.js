const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://root:root@demo-db.kun7s.mongodb.net/demo-db?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const welcomeRoute = require("./api/routes/welcome");
app.use("/welcome", welcomeRoute);

const productRoutes = require("./api/routes/products");
app.use("/products", productRoutes);

const orderRoutes = require("./api/routes/orders");
app.use("/orders", orderRoutes);

const userRoutes = require("./api/routes/users");
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Invalid EndPoint");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
