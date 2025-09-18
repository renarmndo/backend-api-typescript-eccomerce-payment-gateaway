import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { ProductCreateController } from "../controllers/product.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const routes = express.Router();

//routes
routes.post(
  "/",
  AuthMiddleware,
  upload.single("image_url"),
  ProductCreateController
);

export default routes;
