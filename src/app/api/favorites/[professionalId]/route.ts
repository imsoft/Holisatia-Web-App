import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { useCurrentUser } from "@/hooks";
import { useSession } from "next-auth/react";

interface IParams {
  professionalId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { data: session, status } = useSession();

  if (!session) {
    return NextResponse.error();
  }

  const { professionalId } = params;

  if (!professionalId || typeof professionalId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(session.user.favoriteIds || [])];
  favoriteIds.push(professionalId);

  const user = await prisma.user.update({
    where: {
      id: session?.user.id,
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
  const { data: session, status } = useSession();

  if (!session) {
    return NextResponse.error();
  }

  const { professionalId } = params;

  if (!professionalId || typeof professionalId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(session?.user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== professionalId);

  const user = await prisma.user.update({
    where: { id: session?.user.id },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
