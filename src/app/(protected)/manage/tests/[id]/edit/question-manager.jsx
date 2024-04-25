"use client"

import { Accordion, AccordionItem } from "@nextui-org/react"
import TestQuestionTable from "./test-question-table"
import QuestionTable from "./question-table"

export default function QuestionManager({ session, testId }) {
  const defaultContent = "Thông tin kỳ thi"

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem title="Danh sách câu hỏi">
        <TestQuestionTable session={session} testId={testId} />
      </AccordionItem>
      <AccordionItem title="Thêm câu hỏi">
        <QuestionTable session={session} testId={testId} />
      </AccordionItem>
    </Accordion>
  )
}
