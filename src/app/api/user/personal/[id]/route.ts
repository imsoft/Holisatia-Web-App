import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    // Actualiza los datos del usuario, asegurando que el campo 'image' sea el correcto
    // const updatedUser = await prisma.user.update({
    //   where: { id },
    //   data: {
    //     ...data,
    //   },
    // });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        image: data.image,  // Asegúrate de que envías el campo "image", no "profileImage"
      },
    });
    

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
