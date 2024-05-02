const express = require("express");
const {
  registerController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.put("/forget-password", forgetPasswordController);

router.put("/reset-password", resetPasswordController);

module.exports = router;
