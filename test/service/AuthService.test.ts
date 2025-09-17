import { AuthServices } from "../../src/services/auth.services.js";
import { prisma } from "../../dist/app/prisma.app.js";
import bcrypt from "bcryptjs";
import { CustomError } from "../../src/utils/CustomerError.utils.js";

// Mocking  (simulasi )
jest.mock("../../src/app/prisma.app");
prisma: {
  user: {
    findUnique: jest.fn();
    create: jest.fn();
  }
}

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("AuthService.register", () => {
  beforeEach(() => {
    // reset sebelum setiap test agar tidak tercampur
    jest.clearAllMocks();
  });

  // skenario berhasil sukses

  it("should be successfully register new user", async () => {
    // 1.mock data input
    const userData = {
      name: "rendani",
      email: "rendani@gmail.com",
      password: "123",
    };

    // mocking
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("123");

    // simulasikan create
    const createdUser = {
      id: "mock-id-123",
      name: userData.name,
      email: userData.email,
      role: "buyer",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      password: "123", // Prisma akan mengembalikan ini
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

    // 3. Panggil fungsi yang akan diuji
    const result = await AuthServices.register(userData);

    // 4. Lakukan assertion (pengujian)
    // Pastikan prisma.user.findUnique dipanggil dengan benar
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });

    //   // Pastikan prisma.user.create dipanggil dengan data yang benar
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: userData.name,
        email: userData.email,
        password: "hashed_password_123",
      },
    });

    // Pastikan hasil yang dikembalikan tidak memiliki properti password
    expect(result).toEqual({
      id: "mock-id-123",
      name: userData.name,
      email: userData.email,
      role: "buyer",
      status: "pending",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).not.toHaveProperty("password");
  });

  // --- Skenario Gagal (Validasi) ---
  it("should throw a CustomError with status 400 if data is incomplete", async () => {
    // Mock data input yang tidak lengkap
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "", // Password kosong
    };

    // Panggil fungsi dan cek apakah ia melempar error
    await expect(AuthServices.register(userData)).rejects.toThrow(CustomError);
    await expect(AuthServices.register(userData)).rejects.toThrow(
      "Data tidak boleh kosong"
    );
  });

  // --- Skenario Gagal (Konflik) ---
  it("should throw a CustomError with status 409 if email already exists", async () => {
    // Mock data input
    const userData = {
      name: "John Doe",
      email: "existing.email@example.com",
      password: "securepassword123",
    };

    // Simulasikan `findUnique` mengembalikan objek pengguna (email sudah ada)
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "mock-id",
      email: userData.email,
    });

    // Panggil fungsi dan cek apakah ia melempar error
    await expect(AuthServices.register(userData)).rejects.toThrow(CustomError);
    await expect(AuthServices.register(userData)).rejects.toHaveProperty(
      "statusCode",
      409
    );
  });
});
