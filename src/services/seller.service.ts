import type { Seller } from "@prisma/client";
import { prisma } from "../app/prisma.app.js";
import type { SellerRequestBody } from "../types/seller.type.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export class SellerServices {
  static async daftarSeller(data: SellerRequestBody): Promise<Seller> {
    try {
      const {
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
      } = data;

      if (
        !nama_usaha ||
        !tipe_usaha ||
        !deskripsi ||
        !no_tlp ||
        !address ||
        !city ||
        !province ||
        !postalCode ||
        !country ||
        !KTP ||
        !bankName ||
        !bankAccount ||
        !accountHolder
      ) {
        throw new CustomError("Semua data wajib diisi", 400);
      }

      const existingUser = await prisma.seller.findUnique({
        where: {
          userId: userId,
        },
      });

      if (existingUser) {
        throw new CustomError("error, Data user sudah terdaftar", 400);
      }

      const createSeller = await prisma.seller.create({
        data: {
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
        },
      });
      return createSeller;
    } catch (error) {
      console.info(error);
      throw error;
    }
  }
}
