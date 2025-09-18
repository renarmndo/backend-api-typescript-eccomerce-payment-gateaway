import express from "express";
import { createCategoryController } from "../controllers/category.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { roleBasedAuth } from "../middleware/roleBased.middleware.js";

const routes = express.Router();

// routes
routes.post(
  "/",
  AuthMiddleware,
  roleBasedAuth(["admin"]),
  createCategoryController
);

export default routes;
