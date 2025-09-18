import { Xendit } from "xendit-node";
import dotenv from "dotenv";
dotenv.config({ path: ".env.xendit" });

export const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});
