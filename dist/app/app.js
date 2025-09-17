import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "../routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
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
// routes
app.use("/users", authRoutes);
export default app;
//# sourceMappingURL=app.js.map