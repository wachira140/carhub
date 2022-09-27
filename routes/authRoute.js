const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser,
} = require("../controllers/authControllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").delete(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/update-user").post(updateUser);

module.exports = router;
