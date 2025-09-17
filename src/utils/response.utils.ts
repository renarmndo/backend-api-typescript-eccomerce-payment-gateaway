import type { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  msg: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success,
    msg,
    data,
  });
};

export const sendError = <T>(
  res: Response,
  statusCode: number,
  msg: string,
  data?: T
) => {
  return res.status(statusCode).json({
    msg,
  });
};
