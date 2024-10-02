import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { useCurrentUser } from "@/hooks";

interface IParams {
  professionalId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { professionalId } = params;

  if (!professionalId || typeof professionalId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(professionalId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { professionalId } = params;

  if (!professionalId || typeof professionalId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== professionalId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
