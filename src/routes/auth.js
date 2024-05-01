const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware)

router.post("/register", registerController);

router.post("/login" ,loginController);

module.exports = router;
