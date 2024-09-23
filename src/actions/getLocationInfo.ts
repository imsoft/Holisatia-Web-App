"use server";

import prisma from "@/lib/db";

// Función para obtener la información de la localización del usuario
export const getLocationInfo = async (userId: string) => {
  try {
    // Buscar la localización asociada con el ID del usuario
    const location = await prisma.location.findFirst({
      where: {
        userLocationId: userId, // Relacionar la localización con el ID del usuario
      },
    });

    // Retornar los datos de localización o null si no se encuentra
    return location;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
