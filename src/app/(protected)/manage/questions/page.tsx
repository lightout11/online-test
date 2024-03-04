import { Button, Link, Spacer } from "@nextui-org/react";
import QuestionTable from "./question-table";

export default async function Page() {
  return (
    <div className="p-2">
      <QuestionTable />
    </div>
  );
}
