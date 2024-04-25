import QuestionTable from "./question-table";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  
  return (
    <div className="p-2">
      <QuestionTable session={session} />
    </div>
  );
}
