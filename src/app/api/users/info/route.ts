import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json(null, { status: 401 });

  const info = await prisma.user.findFirst({
    where: {
      id: session.user?.id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      gender: true,
      dateOfBirth: true,
      roles: true,
    },
  });

  return NextResponse.json(info);
}
