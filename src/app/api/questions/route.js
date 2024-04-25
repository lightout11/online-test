import { auth } from "@/auth"
import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(req) {
  const session = await auth()
  if (!session) return NextResponse.json(null, { status: 401 })

  const query = await prisma.question.findMany({
    select: {
      id: true,
      content: true,
      type: true,
      difficulty: true,
      categories: true,
      isPublic: true,
      userId: true
    },
    where: {
      OR: [
        {
          userId: session.user?.id
        },
        {
          isPublic: true
        }
      ]
    }
  })

  return NextResponse.json(query)
}
