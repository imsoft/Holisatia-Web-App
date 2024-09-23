import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtener el ID del usuario desde los parámetros de la URL
    const { id } = params;

    // Validar que el ID no esté vacío o nulo
    if (!id) {
      return NextResponse.json(
        { message: "ID de usuario no proporcionado." },
        { status: 400 }
      );
    }

    // Obtener los datos enviados en el cuerpo de la solicitud
    const data = await request.json();

    // Validar los datos recibidos; asegúrate de que al menos un campo es proporcionado
    const validFields = [
      "state",
      "city",
      "address",
      "outerNumber",
      "innerNumber",
      "neighborhood",
      "locationType",
      "postalCode",
      "googleMapsUrl",
    ];
    
    const isValidData = Object.keys(data).some(
      (key) => validFields.includes(key) && typeof data[key] === "string"
    );

    if (!isValidData) {
      return NextResponse.json(
        { message: "Datos inválidos proporcionados." },
        { status: 400 }
      );
    }

    // Intentar buscar la localización existente por el ID del usuario
    const existingLocation = await prisma.location.findFirst({
      where: { userLocationId: id },
    });

    let updatedLocation;

    if (existingLocation) {
      // Si existe la localización, actualizarla
      updatedLocation = await prisma.location.update({
        where: { id: existingLocation.id },
        data,
      });
    } else {
      // Si no existe la localización, crear una nueva
      updatedLocation = await prisma.location.create({
        data: {
          ...data,
          userLocationId: id, // Asignar el ID del usuario
        },
      });
    }

    // Devolver los datos actualizados o creados de la localización como respuesta JSON
    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar o crear la localización:", error);
    return new Response(
      JSON.stringify({
        message: "Ocurrió un error al actualizar o crear la localización.",
        error: (error as Error).message, // Mostrar el mensaje de error específico
      }),
      { status: 500 }
    );
  }
}
