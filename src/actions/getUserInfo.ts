"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export const getUserInfo = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
