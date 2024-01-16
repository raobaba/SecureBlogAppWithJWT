const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");
const isAuthenticated = require("../middleware/login.middleware");

blogRouter.get("/get", getAllBlogs);
blogRouter.get("/getById/:id", getBlogById);
blogRouter.post("/create", isAuthenticated, createBlog);
blogRouter.put("/update/:id", isAuthenticated, updateBlog);
blogRouter.delete("/delete/:id", isAuthenticated, deleteBlog);

module.exports = blogRouter;
