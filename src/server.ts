import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config({ debug: false });
// import { prisma } from "./app/prisma.app.js";

const port = process.env.PORT;

async function startConnection() {
  try {
    // prisma generate table
    // await prisma.$connect();
    // console.info(`Tabel connected to Prisma Successfully`);

    app.listen(port, () => {
      console.info(`Server Running in http://localhost:${port}`);
    });
  } catch (error) {
    console.info(error);
    console.info(`Server Error`);
  }
}

startConnection();
