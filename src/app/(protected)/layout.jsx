import { auth } from "@/auth"
import { redirect } from "next/navigation"
import CustomNavbar from "./custom-navbar"
import { Divider } from "@nextui-org/react"

export default async function Layout({ children }) {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <main className="text-foreground bg-background">
      <header>
        <CustomNavbar session={session} />
        <Divider />
      </header>
      {children}
    </main>
  )
}
