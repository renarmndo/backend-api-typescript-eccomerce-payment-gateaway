import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.utils.js";
export const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(res, 401, "Token tidak ditemukan");
        }
        const token = authHeader.split(" ")[1];
        // varifikasi token
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.info(error);
        return sendError(res, 500, "Terjadi Kesalahan pada server");
    }
};
const allowedFields = ["name", "email", "password"];
export const whitelistFields = (req, res, next) => {
    const extraFields = Object.keys(req.body).filter((key) => !allowedFields.includes(key));
    if (extraFields.length > 0) {
        return res.status(400).json({
            error: `Field tidak diperbolehkan: ${extraFields.join(", ")}`,
        });
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map