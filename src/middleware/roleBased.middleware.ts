import type { Request, Response, NextFunction } from "express";

interface CustomerRequest extends Request {
  user?: {
    role: string;
  };
}

export const roleBasedAuth = (roles: string[]) => {
  return (req: CustomerRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role) {
      return res.status(401).json({
        success: false,
        msg: "Autenticate failed: No user information found",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        msg: "Access denied : You dont not have the required permission",
      });
    }

    next();
  };
};
