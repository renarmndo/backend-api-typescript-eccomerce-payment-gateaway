// import { xendit } from "../app/xendit.app.js";
// import { prisma } from "../app/prisma.app.js";
// import { CustomError } from "../utils/CustomerError.utils.js";

// const { Invoice } = xendit;

// export class OrderService {
//   static async createOrder(
//     userId: string,
//     productId: string,
//     quantity: number
//   ): Promise<any> {
//     try {
//       // 1. Validasi input
//       if (!userId || !productId || !quantity || quantity <= 0) {
//         throw new CustomError("Data order tidak valid", 400);
//       }

//       // 2. Ambil data user
//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         select: { id: true, email: true, name: true },
//       });

//       if (!user) {
//         throw new CustomError("User tidak ditemukan", 404);
//       }

//       // 3. Ambil produk
//       const product = await prisma.productSeller.findUnique({
//         where: { id: productId },
//         include: {
//           seller: {
//             include: {
//               user: { select: { name: true, email: true } },
//             },
//           },
//         },
//       });

//       if (!product) {
//         throw new CustomError("Produk tidak ditemukan", 404);
//       }

//       // 4. Cek stock
//       if (product.stock < quantity) {
//         throw new CustomError("Stock tidak mencukupi", 400);
//       }

//       // 5. Hitung total harga
//       const totalAmount = Number(product.price) * quantity;
//       const externalId = `order-${userId}-${Date.now()}`;

//       // 6. Pastikan FRONTEND_URL ada

//       // 7. Buat invoice ke Xendit (pakai snake_case)
//       const invoiceData = {
//         external_id: externalId,
//         amount: totalAmount,
//         payer_email: user.email,
//         description: `Pembelian ${quantity}x ${product.product_name}`,
//         invoice_duration: 86400, // 24 jam
//         success_redirect_url: `${process.env.FRONTEND_URL}/order/success`,
//         failure_redirect_url: `${process.env.FRONTEND_URL}/order/failure`,
//         currency: "IDR",
//         items: [
//           {
//             name: product.product_name,
//             quantity,
//             price: Number(product.price),
//             category: product.categori_id || "general",
//           },
//         ],
//         customer: {
//           given_names: user.name || "Customer",
//           email: user.email,
//         },
//       };

//       console.log("Creating invoice with data:", invoiceData);

//       const invoice = await Invoice.createInvoice(invoiceData as any);

//       console.log("Invoice created:", invoice);

//       // 8. Simpan order ke database
//       const order = await prisma.order.create({
//         data: {
//           buyerId: userId,
//           productId,
//           qty: quantity,
//           amount: totalAmount,
//           invoiceId: invoice.id as string,
//           invoiceUrl: invoice.invoiceUrl,
//           status: "PENDING",
//         },
//         include: {
//           buyer: { select: { id: true, name: true, email: true } },
//           product: {
//             select: {
//               id: true,
//               product_name: true,
//               price: true,
//               image_url: true,
//             },
//           },
//         },
//       });

//       // 9. Update stok
//       await prisma.productSeller.update({
//         where: { id: productId },
//         data: { stock: { decrement: quantity } },
//       });

//       // 10. Return hasil
//       return {
//         order,
//         invoice: {
//           id: invoice.id,
//           external_id: invoice.externalId,
//           invoice_url: invoice.invoiceUrl,
//           amount: invoice.amount,
//           status: invoice.status,
//           expiry_date: invoice.expiryDate,
//         },
//       };
//     } catch (error: any) {
//       console.error("Error creating order:", error);

//       if (error.error_code) {
//         throw new CustomError(`Xendit Error: ${error.message}`, 400);
//       }

//       if (error.code === "P2002") {
//         throw new CustomError("Order dengan external ID ini sudah ada", 400);
//       }

//       if (error instanceof CustomError) {
//         throw error;
//       }

//       throw new CustomError("Gagal membuat order", 500);
//     }
//   }
// }

// ========== IMPORT YANG BENAR ==========
import { xendit } from "../app/xendit.app.js"; // ✅ Import xendit instance
import { prisma } from "../app/prisma.app.js";
import { CustomError } from "../utils/CustomerError.utils.js";
// ❌ JANGAN import Invoice secara terpisah

export class OrderService {
  static async createOrder(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<any> {
    try {
      // 1. Validasi input
      if (!userId || !productId || !quantity || quantity <= 0) {
        throw new CustomError("Data order tidak valid", 400);
      }

      // 2. Ambil data user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true },
      });

      if (!user || !user.email) {
        throw new CustomError("User atau email tidak ditemukan", 404);
      }

      // 3. Ambil produk
      const product = await prisma.productSeller.findUnique({
        where: { id: productId },
        include: {
          seller: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
      });

      if (!product) {
        throw new CustomError("Produk tidak ditemukan", 404);
      }

      // 4. Cek stock
      if (product.stock < quantity) {
        throw new CustomError("Stock tidak mencukupi", 400);
      }

      // 5. Hitung total harga
      const totalAmount = Number(product.price) * quantity;
      const externalId = `order-${userId}-${Date.now()}`;

      // 6. PERBAIKAN: Format yang benar untuk xendit-node terbaru
      // Coba format camelCase dulu
      const invoiceDataCamelCase = {
        externalId: externalId,
        amount: totalAmount,
        payerEmail: user.email,
        description: `Pembelian ${quantity}x ${product.product_name}`,
        invoiceDuration: 86400,
        successRedirectUrl: `${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/order/success`,
        failureRedirectUrl: `${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/order/failure`,
        currency: "IDR",
        items: [
          {
            name: product.product_name,
            quantity,
            price: Number(product.price),
            category: product.categori_id || "general",
          },
        ],
        customer: {
          givenNames: user.name || "Customer",
          email: user.email,
        },
      };

      console.log(
        "Creating invoice with camelCase data:",
        invoiceDataCamelCase
      );

      let invoice;

      try {
        // ✅ PERBAIKAN: Format API call yang benar
        invoice = await xendit.Invoice.createInvoice({
          data: invoiceDataCamelCase,
        });

        console.log("Invoice created with camelCase:", invoice);
      } catch (camelCaseError: any) {
        console.log(
          "CamelCase failed, trying snake_case:",
          camelCaseError.message
        );

        // Jika camelCase gagal, coba snake_case
        const invoiceDataSnakeCase = {
          external_id: externalId,
          amount: totalAmount,
          payer_email: user.email,
          description: `Pembelian ${quantity}x ${product.product_name}`,
          invoice_duration: 86400,
          success_redirect_url: `${
            process.env.FRONTEND_URL || "http://localhost:3000"
          }/order/success`,
          failure_redirect_url: `${
            process.env.FRONTEND_URL || "http://localhost:3000"
          }/order/failure`,
          currency: "IDR",
          items: [
            {
              name: product.product_name,
              quantity,
              price: Number(product.price),
              category: product.categori_id || "general",
            },
          ],
          customer: {
            given_names: user.name || "Customer",
            email: user.email,
          },
        };

        console.log("Trying snake_case data:", invoiceDataSnakeCase);

        // Coba format lama
        invoice = await xendit.Invoice.createInvoice(
          invoiceDataSnakeCase as any
        );
        console.log("Invoice created with snake_case:", invoice);
      }

      // 7. Simpan order ke database
      const order = await prisma.order.create({
        data: {
          buyerId: userId, // sesuai dengan model Anda (buyerId)
          productId,
          qty: quantity, // sesuai dengan model Anda (qty)
          amount: totalAmount, // Prisma akan convert ke Decimal
          invoiceId: invoice.id as string,
          invoiceUrl: invoice.invoiceUrl || invoice.invoiceUrl, // handle both formats
          status: "PENDING",
        },
        include: {
          buyer: { select: { id: true, name: true, email: true } },
          product: {
            select: {
              id: true,
              product_name: true,
              price: true,
              image_url: true,
            },
          },
        },
      });

      // 8. Update stok
      await prisma.productSeller.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
      });

      // 9. Return hasil
      return {
        order,
        invoice: {
          id: invoice.id,
          external_id: invoice.externalId || invoice.externalId,
          invoice_url: invoice.invoiceUrl || invoice.invoiceUrl,
          amount: invoice.amount,
          status: invoice.status,
          expiry_date: invoice.expiryDate || invoice.expiryDate,
        },
      };
    } catch (error: any) {
      console.error("Error creating order:", {
        message: error.message,
        errorCode: error.error_code,
        field: error.field,
        stack: error.stack,
      });

      // Handle Xendit specific errors
      if (error.error_code || error.field === "createInvoiceRequest") {
        throw new CustomError(`Xendit Error: ${error.message}`, 400);
      }

      // Handle Prisma errors
      if (error.code === "P2002") {
        throw new CustomError("Invoice ID sudah ada", 400);
      }

      // Re-throw custom errors
      if (error instanceof CustomError) {
        throw error;
      }

      // Generic error
      throw new CustomError(`Gagal membuat order: ${error.message}`, 500);
    }
  }

  // Method untuk debug/test
  static async testInvoiceCreation(): Promise<any> {
    try {
      const testData = {
        externalId: `test-${Date.now()}`,
        amount: 10000,
        payerEmail: "test@example.com",
        description: "Test invoice",
      };

      console.log("Testing with camelCase...");

      try {
        const invoice = await xendit.Invoice.createInvoice({
          data: testData,
        });
        console.log("CamelCase works:", invoice);
        return { format: "camelCase", invoice };
      } catch (error) {
        console.log("CamelCase failed, trying snake_case...");

        const snakeData = {
          external_id: `test-${Date.now()}`,
          amount: 10000,
          payer_email: "test@example.com",
          description: "Test invoice snake case",
        };

        const invoice = await xendit.Invoice.createInvoice(snakeData as any);
        console.log("Snake_case works:", invoice);
        return { format: "snake_case", invoice };
      }
    } catch (error) {
      console.error("Both formats failed:", error);
      throw error;
    }
  }
}

// ========== CONTROLLER ==========
export const createOrderController = async (req: any, res: any) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID dan quantity harus diisi dengan nilai yang valid",
      });
    }

    const result = await OrderService.createOrder(
      userId,
      productId,
      Number(quantity)
    );

    res.status(201).json({
      success: true,
      message: "Order berhasil dibuat",
      data: result,
    });
  } catch (error: any) {
    console.error("Controller error:", error);

    if (error instanceof CustomError) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        stack: error.stack,
      }),
    });
  }
};

// Test controller
export const testInvoiceController = async (req: any, res: any) => {
  try {
    const result = await OrderService.testInvoiceCreation();
    res.json({
      success: true,
      message: "Test successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Test failed",
      error: error.message,
    });
  }
};
