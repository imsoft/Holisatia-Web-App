"use server";

import prisma from "@/lib/db";

export const getContactInfo = async (userId: string) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        userContactId: userId,
      },
    });
    return contact;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
};