import { getTest } from "@/actions/tests";
import TestForm from "./test-form";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Spacer,
} from "@nextui-org/react";
import TestQuestionTable from "./test-question-table";
import { auth } from "@/auth";
import QuestionManager from "./question-manager";
import { get } from "http";
import { getResultsByTestId } from "@/actions/results";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const test = await getTest(params.id);

  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <TestForm test={test} />
        </CardBody>
      </Card>
      <Spacer />
      <QuestionManager session={session} testId={params.id} />
    </div>
  );
}
