import express from "express";
import { daftarSeller } from "../controllers/seller.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const routes = express.Router();

// routes
routes.post("/", AuthMiddleware, daftarSeller);

export default routes;
