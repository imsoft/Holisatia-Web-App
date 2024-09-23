import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtener el ID del profesional desde los parámetros de la URL
    const { id } = params;

    // Validar que el ID no esté vacío o nulo
    if (!id) {
      return NextResponse.json(
        { message: "ID de profesional no proporcionado." },
        { status: 400 }
      );
    }

    // Obtener los datos enviados en el cuerpo de la solicitud
    const data = await request.json();

    // Validar los datos recibidos; asegúrate de que al menos un campo es proporcionado
    const validFields = [
      "specialty",
      "focusAreas",
      "aspect",
      "therapyType",
      "languages",
      "qualification",
      "clinicalQuestionnaireAttachment",
      "approved",
    ];

    const isValidData = Object.keys(data).some(
      (key) => validFields.includes(key) && data[key] !== undefined
    );

    if (!isValidData) {
      return NextResponse.json(
        { message: "Datos inválidos proporcionados." },
        { status: 400 }
      );
    }

    // Intentar buscar el profesional existente por su ID
    const existingProfessional = await prisma.professional.findFirst({
      where: { userProfessionalId: id },
    });

    let updatedProfessional;

    if (existingProfessional) {
      // Si existe el profesional, actualizarlo
      updatedProfessional = await prisma.professional.update({
        where: { id: existingProfessional.id },
        data,
      });
    } else {
      // Si no existe el profesional, crear uno nuevo
      updatedProfessional = await prisma.professional.create({
        data: {
          ...data,
          userProfessionalId: id,
        },
      });
    }

    // Devolver los datos actualizados o creados del profesional como respuesta JSON
    return NextResponse.json(updatedProfessional, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar o crear el profesional:", error);
    return new Response(
      JSON.stringify({
        message: "Ocurrió un error al actualizar o crear el profesional.",
        error: (error as Error).message, // Mostrar el mensaje de error específico
      }),
      { status: 500 }
    );
  }
}
