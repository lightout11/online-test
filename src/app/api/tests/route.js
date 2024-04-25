import { auth } from "@/auth"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req) {
  const session = await auth()
  if (!session) redirect("/login")

  const tests = await prisma.test.findMany({
    select: {
      id: true,
      name: true,
      startDateTime: true,
      duration: true,
      endDateTime: true,
      userId: true
    },
    where: {
      userId: session?.user?.id
    }
  })

  return NextResponse.json(tests)
}
