import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) redirect("/login");

  const tests = await prisma.test.findMany({
    select: {
      id: true,
      name: true,
      startDateTime: true,
      duration: true,
      endDateTime: true,
      userId: true,
    },
    where: {
      userId: session?.user?.id,
    },
  });

  return NextResponse.json(tests);
}
