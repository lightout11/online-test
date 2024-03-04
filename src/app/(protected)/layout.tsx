import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import CustomNavbar from "./custom-navbar";
import { Divider } from "@nextui-org/react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");
  console.log(session);

  return (
    <main className="text-foreground bg-background">
      <header>
        <CustomNavbar session={session} />
        <Divider />
      </header>
      {children}
    </main>
  );
}
