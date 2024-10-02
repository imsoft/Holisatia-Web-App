import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtener el ID del detalle de la sesión médica desde los parámetros de la URL
    const { id } = params;

    // Validar que el ID no esté vacío o nulo
    if (!id) {
      return NextResponse.json(
        { message: "ID de sesión médica no proporcionado." },
        { status: 400 }
      );
    }

    // Obtener los datos enviados en el cuerpo de la solicitud
    const data = await request.json();

    // Verificar si existe el detalle de sesión médica con el ID proporcionado
    const existingSessionDetail =
      await prisma.professionalSessionDetail.findUnique({
        where: { id }, // Usa el campo 'id' directamente
      });

    // Si no existe, retornar un error 404
    if (!existingSessionDetail) {
      return NextResponse.json(
        { message: "Detalle de sesión médica no encontrado." },
        { status: 404 }
      );
    }

    // Actualizar el detalle de sesión médica con los nuevos datos
    const updatedSessionDetail = await prisma.professionalSessionDetail.update({
      where: { id: existingSessionDetail.id }, // Asegúrate de usar el 'id' correcto
      data,
    });

    // Devolver la respuesta con el detalle de sesión actualizado
    return NextResponse.json(updatedSessionDetail, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el detalle de sesión médica:", error);
    return new Response(
      JSON.stringify({
        message: "Ocurrió un error al actualizar el detalle de sesión médica.",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
