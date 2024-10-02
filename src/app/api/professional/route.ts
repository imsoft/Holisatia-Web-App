import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data = await request.json();

    // Crear el profesional vinculado al usuario
    const newProfessional = await prisma.professional.create({
      data: {
        userProfessionalId: data.userId,  // Vincular al usuario con el profesional
      },
    });

    // Si necesitas agregar detalles de la sesión médica, puedes hacerlo aquí
    await prisma.professionalSessionDetail.create({
      data: {
        professionalSessionDetailId: newProfessional.id,
        // Otros detalles que sean necesarios para la sesión médica
      },
    });

    return NextResponse.json(newProfessional, { status: 201 });
  } catch (error) {
    console.error("Error creando el profesional:", error);
    return new Response(
      JSON.stringify({
        message: "Error creating professional",
        error,
      }),
      { status: 500 }
    );
  }
}
