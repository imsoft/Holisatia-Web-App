"use server";

import prisma from "@/lib/db";

// Función para obtener la información profesional del usuario
export const getProfessionalInfo = async (userId: string) => {
  try {
    // Buscar el profesional asociado con el ID del usuario
    const professional = await prisma.professional.findFirst({
      where: {
        userProfessionalId: userId,
      },
    });

    // Retornar los datos del profesional o null si no se encuentra
    return professional;
  } catch (error) {
    console.error("Error fetching professional data:", error);
    return null;
  }
};
