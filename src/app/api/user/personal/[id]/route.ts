import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtener el ID del usuario desde los parámetros de la URL
    const { id } = params;

    // Obtener los datos enviados en el cuerpo de la solicitud
    const data = await request.json();

    // Actualizar los datos del usuario en la base de datos usando Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    // Devolver los datos actualizados del usuario como respuesta JSON
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "An error occurred",
        error,
      }),
      { status: 500 }
    );
  }
}
