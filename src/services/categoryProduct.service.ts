import type { CategoryProduct } from "@prisma/client";
import { prisma } from "../app/prisma.app.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export class CategoryService {
  static async createCategory(data: any): Promise<CategoryProduct> {
    try {
      const { name, userId } = data;
      if (!name) {
        throw new CustomError("Data tidak boleh kosong", 400);
      }

      const existingName = await prisma.categoryProduct.findUnique({
        where: { name },
      });

      if (existingName) {
        throw new CustomError(
          "Category sudah ada ditabel, gunakan Category lain",
          400
        );
      }

      const category = await prisma.categoryProduct.create({
        data: {
          name: name,
          userId: userId,
        },
      });

      return category;
    } catch (error) {
      throw error;
    }
  }
}
