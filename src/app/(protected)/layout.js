import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Divider } from "@nextui-org/react";
import NavigationBar from "../navigation-bar";
import { signIn } from "next-auth/react";

export default async function Layout({ children }) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <main className="text-foreground bg-background">
      <header>
        <NavigationBar session={session} />
        <Divider />
      </header>
      {children}
    </main>
  );
}
