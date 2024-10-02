import prisma from "@/lib/db";

export const getProfessional = async (professionalId: string) => {
  try {
    const professional = await prisma.professional.findUnique({
      where: {
        id: professionalId,
      },
      include: {
        userProfessional: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            locations: {
              select: {
                state: true,
                city: true,
                address: true,
                outerNumber: true,
                innerNumber: true,
                neighborhood: true,
                locationType: true,
                postalCode: true,
                googleMapsUrl: true,
              },
            },
            contact: {
              // Incluir los datos de contacto
              select: {
                phoneNumber: true,
                facebookUrl: true,
                instagramUrl: true,
                linkedinUrl: true,
                tiktokUrl: true,
                threadsUrl: true,
                youtubeUrl: true,
                xUrl: true,
              },
            },
          },
        },
        sessionDetails: {
          select: {
            id: true,
            price: true,
            sessionDuration: true,
            openingHours: true,
            closingHours: true,
            consultationFormat: true,
            consultoryImages: true,
          },
        },
      },
    });

    if (!professional) {
      throw new Error(`Professional with ID ${professionalId} not found.`);
    }

    return professional;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
