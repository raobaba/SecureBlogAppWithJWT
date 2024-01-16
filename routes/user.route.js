const express = require("express");
const userRouter = express.Router();
const {
  Register,
  Login,
  Logout,
} = require("../controller/user.controller.js");


userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);


module.exports = userRouter;