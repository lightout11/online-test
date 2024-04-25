import { Card, CardBody, CardHeader, Link } from "@nextui-org/react"
import LoginForm from "./login-form"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()
  if (session) redirect("/home")

  return (
    <Card>
      <CardHeader>
        <Link href="/">Thi Online</Link>
      </CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  )
}
