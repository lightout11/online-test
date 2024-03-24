"use client";

import { useState } from "react";
import NewMultiChoiceForm from "./new-multi-choices-form";
import NewShortAnswerForm from "./new-short-answer-form";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  Spacer,
} from "@nextui-org/react";
import NewOpenedAnswerForm from "./new-open-answer-form";

const types = [
  { label: "Trả lời ngắn", value: "shortAnswer" },
  { label: "Trả lời mở", value: "openedAnswer" },
  { label: "Chọn đáp án đúng", value: "multiChoice" },
  { label: "Chọn nhiều đáp án đúng", value: "multiSelect" },
  { label: "Sắp xếp", value: "ordering" },
  { label: "Điền vào chỗ trống", value: "filling" },
];

export default function NewQuestionForm() {
  const [questionType, setQuestionType] = useState<any>("shortAnswer");

  function renderQuestionByType(type: string) {
    switch (type) {
      case "shortAnswer":
        return <NewShortAnswerForm />;
      case "openedAnswer":
        return <NewOpenedAnswerForm />;
      case "multiChoice":
        return <NewMultiChoiceForm />;
    }
  }

  return (
    <div className="p-2">
      <Card>
        <CardBody>
          <Autocomplete
            label="Loại câu hỏi"
            defaultItems={types}
            selectedKey={questionType}
            onSelectionChange={setQuestionType}
          >
            {types.map((type) => (
              <AutocompleteItem key={type.value} value={type.value}>
                {type.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Spacer />
          {renderQuestionByType(questionType)}
        </CardBody>
      </Card>
    </div>
  );
}
