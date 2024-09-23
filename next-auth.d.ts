import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  birthday: Date | null;
  role: UserRole;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
  // isTwoFactorEnabled: boolean;
  // isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
