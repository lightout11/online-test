"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TestQuestionTable from "./test-question-table";
import QuestionTable from "./question-table";

export default function QuestionManager({ session, testId }) {
  const defaultContent = "Thông tin kỳ thi";

  return (
    <Accordion
      defaultExpandedKeys={["testQuestionManager", "questionTable"]}
      selectionMode="multiple"
    >
      <AccordionItem key="testQuestionManager" title="Danh sách câu hỏi">
        <TestQuestionTable session={session} testId={testId} />
      </AccordionItem>
      <AccordionItem key="questionTable" title="Thêm câu hỏi">
        <QuestionTable session={session} testId={testId} />
      </AccordionItem>
    </Accordion>
  );
}
