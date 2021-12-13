const express = require("express");
const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controller/orders");

const router = express.Router();

router.post("/", checkAuth, OrderController.order_create);

router.put("/:id", checkAuth, OrderController.order_update);

router.delete("/:id", checkAuth, OrderController.order_delete);

router.get("/:id", checkAuth, OrderController.order_get);

router.get("/", checkAuth, OrderController.order_get_all);

module.exports = router;
