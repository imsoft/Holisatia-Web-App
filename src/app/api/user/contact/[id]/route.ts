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
      "facebookUrl",
      "instagramUrl",
      "tiktokUrl",
      "threadsUrl",
      "youtubeUrl",
      "xUrl",
      "linkedinUrl",
      "phoneNumber",
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

    const existingContact = await prisma.contact.findFirst({
      where: { userContactId: id },
    });

    let updatedContact;

    if (existingContact) {
      updatedContact = await prisma.contact.update({
        where: { id: existingContact.id },
        data,
      });
    } else {
      updatedContact = await prisma.contact.create({
        data: {
          ...data,
          userContactId: id, // Asignar el ID del usuario
        },
      });
    }

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar o crear el contacto:", error);
    return new Response(
      JSON.stringify({
        message: "Ocurrió un error al actualizar o crear el contacto.",
        error: (error as Error).message, // Mostrar el mensaje de error específico
      }),
      { status: 500 }
    );
  }
}
