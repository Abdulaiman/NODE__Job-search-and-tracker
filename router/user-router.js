const express = require("express");
const {
  signUp,
  login,
  protect,
  getMe,
  updateMe,
  updatePassword,
} = require("../controllers/auth-controller");

const Router = express.Router();

Router.post("/sign-up", signUp);
Router.post("/login", login);
Router.use(protect);
Router.get("/me", getMe);
Router.patch("/update-me", updateMe);
Router.patch("/update-password", updatePassword);

module.exports = Router;
