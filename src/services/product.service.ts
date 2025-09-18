import type { ProductSeller } from "@prisma/client";
import { prisma } from "../app/prisma.app.js";
import { CustomError } from "../utils/CustomerError.utils.js";
import { ProductStatus } from "@prisma/client";

interface CreateProductInput {
  product_name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  categori_id: string;
  // Gunakan seller_id, bukan userId, karena lebih spesifik
}

export class ProductServices {
  static async create(
    data: CreateProductInput,
    userId: string,
    image_url: string
  ): Promise<ProductSeller> {
    try {
      const { product_name, description, price, stock, status, categori_id } =
        data;

      if (!product_name) {
        throw new CustomError("Nama Produk Wajib Diisi", 400);
      }

      if (!price) {
        throw new CustomError("Harga Produk Wajib Diisi", 400);
      }

      const seller = await prisma.seller.findUnique({
        where: { userId }, // cari seller dari user login
      });

      if (!seller) {
        throw new CustomError(
          "Seller profile tidak ditemukan untuk user ini",
          400
        );
      }

      const product = await prisma.productSeller.create({
        data: {
          product_name,
          description,
          price,
          stock,
          status,
          image_url, // Gunakan parameter image_url
          seller_id: seller.id, // Gunakan parameter userId
          categori_id,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }
}
