const express = require("express");
const {
  registerController,
  loginController,
  forgetPassword,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login" ,loginController);

router.put('/forget-password',forgetPassword);


module.exports = router;
