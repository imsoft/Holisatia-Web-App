import prisma from "@/lib/db";

export const getProfessionals = async () => {
  try {
    const professionals = await prisma.professional.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        userProfessional: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    });

    return professionals;
  } catch (error: any) {
    throw new Error(error);
  }
};
