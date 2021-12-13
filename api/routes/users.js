const express = require("express");
const UserController = require("../controller/users");

const router = express.Router();

router.post("/login", UserController.Users_login);

router.post("/signup", UserController.Users_signup);

module.exports = router;
