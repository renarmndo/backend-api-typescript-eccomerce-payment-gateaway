import { prisma } from "../app/prisma.app.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomerError.utils.js";
import type { UserWitoutPassword } from "../utils/service.utils.js";
import type { RequestRegister, RequestLogin } from "../types/Api.types.js";
import dotenv from "dotenv";
dotenv.config();

export class AuthServices {
  static async register(data: RequestRegister): Promise<UserWitoutPassword> {
    try {
      const { name, email, password } = data;

      if (!name || !email || !password) {
        throw new CustomError("Data tidak boleh kosong", 400);
      }

      // cari apakah email usdah pernah didaftarkan
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        throw new CustomError(
          "Email sudah terdaftar, Gunakan email lain atau silahkan Login",
          409
        );
      }

      // hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { password: _password, ...userWithoutPassword } = user;

      //kemablikan user
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  static async login(data: RequestLogin): Promise<any> {
    const jwtsecret = process.env.JWT_SECRET;
    const expiresIn = process.env.EXPIRES_IN;

    try {
      const { email, password } = data;

      if (!email || !password) {
        throw new CustomError("Data tidak boleh kosong", 400);
      }

      // cari apakah email ada
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new CustomError("Email Salah", 401);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new CustomError("Password Salah", 401);
      }

      if (!jwtsecret) {
        // Melempar error untuk memberitahu jika secret tidak terdefinisi
        throw new Error(
          "JWT_SECRET tidak ditemukan pada environment variables"
        );
      }

      // genearete token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        jwtsecret,
        {
          expiresIn: expiresIn,
        } as any
      );

      // simpan user di sesssion

      const { password: _password, ...userWithoutPassword } = user;
      return { token, user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
}
