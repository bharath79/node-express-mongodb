const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controller/products");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const router = express.Router();

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.product_create
);

router.put("/:id", checkAuth, ProductController.product_update);

router.delete("/:id", checkAuth, ProductController.product_delete);

router.get("/:id", checkAuth, ProductController.product_get);

router.get("/", checkAuth, ProductController.product_get_all);

module.exports = router;
