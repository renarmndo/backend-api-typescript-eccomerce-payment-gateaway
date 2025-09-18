import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response.utils.js";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Token tidak ditemukan");
    }

    const token = authHeader.split(" ")[1] as string;

    // varifikasi token
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret);

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.info(error);
    return sendError(res, 500, "Terjadi Kesalahan pada server");
  }
};

const allowedFields = ["name", "email", "password"];

export const whitelistFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      error: `Field tidak diperbolehkan: ${extraFields.join(", ")}`,
    });
  }
  next();
};
