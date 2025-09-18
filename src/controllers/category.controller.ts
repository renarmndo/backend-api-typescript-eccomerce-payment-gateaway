import { CategoryService } from "../services/categoryProduct.service.js";
import type { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as any).user.id;

    const categorie = await CategoryService.createCategory({
      name,
      userId,
    });

    return sendResponse(res, 201, true, "Berhasil Menambahkan Categorie", {
      id: categorie.id,
      name: categorie.name,
      userId: categorie.userId,
    });
  } catch (error) {
    console.info(error);
    if (error instanceof CustomError) {
      return sendError(
        res,
        error.status || 500,
        error.message || "Terjadi Kesalahan pada server"
      );
    }
  }
};
