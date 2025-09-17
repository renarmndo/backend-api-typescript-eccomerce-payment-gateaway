import type { Request, Response, NextFunction } from "express";

export const sessionAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.session as any).user) {
    return res.status(401).json({
      msg: "Not logged In",
    });
  }

  next();
};
