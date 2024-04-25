import { auth } from "@/auth"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const session = await auth()
  if (!session) redirect("/login")

  const questions = await prisma.question.findMany({
    select: {
      id: true,
      content: true,
      type: true,
      difficulty: true,
      categories: true,
      isPublic: true
    },
    where: {
      testIds: {
        has: params.id
      }
    }
  })

  return NextResponse.json(questions)
}
