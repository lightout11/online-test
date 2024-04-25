import { auth } from "@/auth"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const session = await auth()
  if (!session) redirect("/login")

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      user: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    where: {
      testId: params.id
    }
  })

  return NextResponse.json(results)
}
