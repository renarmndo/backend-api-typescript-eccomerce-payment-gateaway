import { createOrder } from "../controllers/payment.xendit.js";
import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const routes = express.Router();

// routes
routes.post("/:productId", AuthMiddleware, createOrder);

export default routes;
