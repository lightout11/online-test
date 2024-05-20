import { auth } from "@/auth";
import NavigationBar from "./navigation-bar";

export default async function Home() {
  const session = await auth();
  // if (session) redirect("/home");

  return (
    // <main className="text-foreground bg-background">
    <main>  
      <NavigationBar session={session} />
    </main>
  );
}
