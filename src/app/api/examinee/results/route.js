import { auth } from "@/auth"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req) {
  const session = await auth()
  if (!session) redirect("/login")

  const results = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      test: {
        select: {
          id: true,
          name: true
        }
      }
    },
    where: {
      userId: session?.user?.id
    }
  })

  return NextResponse.json(results)
}
