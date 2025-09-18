import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "../routes/auth.routes.js";
import sellerRoutes from "../routes/seller.routes.js";
import categorieRoutes from "../routes/categorie.routes.js";
import productRoutes from "../routes/products.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import orderRoutes from "../routes/payment.routes.js";
// import { prisma } from "./prisma.app.js";
// import type { Request, Response } from "express";
// bikin __filename dan __dirname manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// session
app.use(session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    },
}));
// multer
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
app.use("/users", authRoutes);
app.use("/sellers", sellerRoutes);
app.use("/categories", categorieRoutes);
app.use("/products", productRoutes);
app.use("/payments", orderRoutes);
// testing get
// app.get("/get", async (req: Request, res: Response) => {
//   const category = await prisma.categoryProduct.findMany({});
//   res.send(category);
// });
export default app;
//# sourceMappingURL=app.js.map