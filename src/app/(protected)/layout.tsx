import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import CustomNavbar from "./custom-navbar";
import { Divider, Spacer } from "@nextui-org/react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="text-foreground bg-background">
      <CustomNavbar session={session} />
      <Divider />
      {children}
    </main>
  );
}
