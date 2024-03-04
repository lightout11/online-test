import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json(null, { status: 401 });

  const query = await prisma.question.findMany({
    select: {
      id: true,
      content: true,
      type: true,
      difficulty: true,
      categories: true,
      isPublic: true,
    },
    where: {
      OR: [
        {
          userId: session.user?.id,
        },
        {
          isPublic: true,
        },
      ],
    },
  });

  return NextResponse.json(query);
}
