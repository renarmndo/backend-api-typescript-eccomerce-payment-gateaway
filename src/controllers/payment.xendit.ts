import type { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { OrderService } from "../services/xendit.service.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const buyerId = (req as any).user.id;
    const { qty } = req.body;

    const result = await OrderService.createOrder(
      buyerId as string,
      productId as string,
      qty
    );

    return sendResponse(res, 201, true, "Order Berhasil dibuat", {
      result,
    });

    // hitung total
  } catch (error) {
    console.info(error);
    if (error instanceof CustomError) {
      return sendError(
        res,
        error.status || 5000,
        error.message || "Terjadi kesalahan pada server"
      );
    }
  }
};
