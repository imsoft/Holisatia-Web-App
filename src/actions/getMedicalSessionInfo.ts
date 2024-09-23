"use server";

import prisma from "@/lib/db";

export const getMedicalSessionInfo = async (userId: string) => {
  // Buscar el profesional asociado con el usuario actual usando su ID
  const professional = await prisma.professional.findFirst({
    where: { userProfessionalId: userId },
  });

  // Verificar si se encontró el profesional
  if (!professional) {
    return null;
  }

  // Buscar la sesión médica asociada con el profesional usando su ID
  const medicalSession = await prisma.professionalSessionDetail.findFirst({
    where: { professionalSessionDetailId: professional.id },
  });

  // Crear un objeto con datos iniciales si no existe la sesión médica
  const defaultMedicalSession = {
    id: "", // El id se asignará cuando se cree una nueva sesión
    price: 0,
    sessionDuration: "",
    openingHours: "",
    closingHours: "",
    consultationFormat: null,
    consultoryImages: [],
    professionalSessionDetailId: professional.id, // Usar el ID del profesional aquí
    createdAt: new Date(), // Asignar como tipo Date
    updatedAt: new Date(), // Asignar como tipo Date
  };

  return medicalSession ?? defaultMedicalSession;
};
