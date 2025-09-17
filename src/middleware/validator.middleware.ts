import type { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response.utils.js";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const firstErrorMsg = error.array()[0]?.msg;
    return sendError(res, 400, firstErrorMsg);
  }
  next();
};
