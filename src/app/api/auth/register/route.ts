import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "El usuario ya existe" },
      { status: 500 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
};
