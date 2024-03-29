const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error.middleware.js");
const Connection = require('./config/db.js');
const userRouter = require('./routes/user.route.js');
const blogRouter = require('./routes/blog.route.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
Connection();

app.use('/api/v1',userRouter)
app.use('/api/v1',blogRouter);

app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

app.use(errorHandler);

module.exports = app;
