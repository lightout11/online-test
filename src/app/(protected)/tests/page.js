import { auth } from "@/auth";
import TestTable from "./test-table";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-2">
      <TestTable session={session} />
    </div>
  );
}
