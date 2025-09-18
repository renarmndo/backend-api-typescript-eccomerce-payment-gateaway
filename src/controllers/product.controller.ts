import { ProductServices } from "../services/product.service.js";
import type { Request, Response } from "express";
import { CustomError } from "../utils/CustomerError.utils.js";
import { sendError } from "../utils/response.utils.js";

export const ProductCreateController = async (req: Request, res: Response) => {
  try {
    // 1. Ekstrak data dari request
    const { product_name, description, price, stock, status, categori_id } =
      req.body;
    const image_url = req.file?.filename || req.file?.path; // Sesuaikan dengan multer setup
    const userId = (req as any).user.id;

    // 2. Validasi input di controller (basic validation)
    if (!product_name) {
      return res.status(400).json({
        success: false,
        message: "Nama Produk Wajib Diisi",
      });
    }

    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Harga Produk Wajib Diisi",
      });
    }

    if (!image_url) {
      return res.status(400).json({
        success: false,
        message: "Gambar Produk Wajib Diupload",
      });
    }

    // 3. Siapkan data untuk service
    const productData = {
      product_name,
      description,
      price: Number(price), // Pastikan price adalah number
      stock: Number(stock) || 0,
      status,
      categori_id,
    };

    // 4. Panggil service dengan parameter yang benar
    const product = await ProductServices.create(
      productData,
      userId,
      image_url
    );

    // 5. Kirim response sukses
    res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: product,
    });
  } catch (error: any) {
    // 6. Handle error
    console.error("Error creating product:", error);

    if (error instanceof CustomError) {
      return sendError(
        res,
        error.status || 500,
        error.message || "terjadi kesalahan pada server"
      );
    }
  }
};
