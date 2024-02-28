import { Card, CardHeader } from "@nextui-org/react";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="text-foreground bg-background min-h-screen min-w-screen flex flex-auto justify-center place-items-center">
      {children}
    </main>
  );
}