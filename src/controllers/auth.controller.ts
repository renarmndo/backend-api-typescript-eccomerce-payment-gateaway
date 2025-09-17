import type { Request, Response } from "express";
import { AuthServices } from "../services/auth.services.js";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { CustomError } from "../utils/CustomerError.utils.js";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthServices.register({
      name,
      email,
      password,
    });

    return sendResponse(res, 201, true, "Registrasi Berhasil", {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthServices.login({
      email,
      password,
    });

    const responseData = { ...user, token };

    (req.session as any).user = {
      id: responseData.id,
      name: responseData.name,
      email: responseData.email,
    };

    return sendResponse(res, 200, true, "Login Berhasil", {
      id: responseData.id,
      email: responseData.email,
      name: responseData.name,
      token: responseData.token,
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
