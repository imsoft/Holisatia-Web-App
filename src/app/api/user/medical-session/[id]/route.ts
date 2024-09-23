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

    // Validar que el profesional existe
    const existingProfessional = await prisma.professional.findUnique({
      where: { id },
    });

    if (!existingProfessional) {
      return NextResponse.json(
        { message: "Profesional no encontrado." },
        { status: 404 }
      );
    }

    // Validar los datos recibidos; asegúrate de que al menos un campo es proporcionado
    const validFields = [
      "price",
      "sessionDuration",
      "openingHours",
      "closingHours",
      "consultationFormat",
      "consultoryImages", // Esta es la URL de la imagen
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

    // Intentar buscar el detalle de sesión existente para el profesional
    const existingSessionDetail =
      await prisma.professionalSessionDetail.findFirst({
        where: { professionalSessionDetailId: id },
      });

    let updatedSessionDetail;

    if (existingSessionDetail) {
      // Si existe el detalle de la sesión, actualizarlo
      updatedSessionDetail = await prisma.professionalSessionDetail.update({
        where: { id: existingSessionDetail.id },
        data,
      });
    } else {
      // Si no existe el detalle de sesión, crear uno nuevo
      updatedSessionDetail = await prisma.professionalSessionDetail.create({
        data: {
          ...data,
          professionalSessionDetailId: id, // Asegurar que tenga una referencia válida al profesional
        },
      });
    }

    // Devolver los datos actualizados o creados del detalle de la sesión como respuesta JSON
    return NextResponse.json(updatedSessionDetail, { status: 200 });
  } catch (error) {
    console.error(
      "Error al actualizar o crear el detalle de sesión médica:",
      error
    );
    return new Response(
      JSON.stringify({
        message:
          "Ocurrió un error al actualizar o crear el detalle de sesión médica.",
        error: (error as Error).message, // Mostrar el mensaje de error específico
      }),
      { status: 500 }
    );
  }
}
