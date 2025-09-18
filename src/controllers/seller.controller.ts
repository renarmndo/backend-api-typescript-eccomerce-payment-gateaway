import type { Request, Response } from "express";
import { SellerServices } from "../services/seller.service.js";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export const daftarSeller = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      nama_usaha,
      tipe_usaha,
      deskripsi,
      no_tlp,
      address,
      city,
      province,
      postalCode,
      country,
      KTP,
      bankName,
      bankAccount,
      accountHolder,
    } = req.body;

    if (!userId) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: userId tidak ditemukan"
      );
    }

    const createSeller = await SellerServices.daftarSeller({
      userId,
      nama_usaha,
      tipe_usaha,
      deskripsi,
      no_tlp,
      address,
      city,
      province,
      postalCode,
      country,
      KTP,
      bankName,
      bankAccount,
      accountHolder,
    });

    return sendResponse(res, 201, true, "Pendaftaran Seller Selesai", {
      createSeller,
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
