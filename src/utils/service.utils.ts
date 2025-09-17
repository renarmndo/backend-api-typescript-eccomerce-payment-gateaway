import type { User } from "@prisma/client";

export type UserWitoutPassword = Omit<User, "password">;
